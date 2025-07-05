

import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Utils } from 'src/common/utils';
import { ResponseHandler } from 'src/common/response.handler';
import { BadRequestException } from '@nestjs/common';


const utils = new Utils();
const responseHandler = new ResponseHandler();

@Injectable()
export class UsersService {
    constructor(@InjectModel("users") private userModel: Model<User>,) { }

    async createUser(userData: {}) {
        try {
            userData["userId"] = utils.naniod();
            if (userData?.["password"] !== userData?.["confirmPassword"]) {
                return new BadRequestException('Password and Confirm Password must match')?.["response"];
            }
            userData["password"] = await utils.generatePasswordHash(userData?.["password"]);
            userData["confirmPassword"] = await utils.generatePasswordHash(userData?.["confirmPassword"]);

            const userDetails = await this.userModel.create(userData);
            if (userDetails) {
                return userDetails
            } else {
                throw new NotAcceptableException()
            }

        } catch (error) {
            throw new NotAcceptableException("Email already exists and email must be unique")
        }
    }

    async updateUser(userId: string, userUpdate: {}) {
        const user = await this.userModel.findOneAndUpdate({ userId }, {
            $set: {
                "name": userUpdate?.["name"],
                "email": userUpdate?.["email"]
            }
        }, { new: true });
        if (user) {
            return user;
        } else {
            throw new NotFoundException("user not found")
        }
    }

    async getUser(userId: string) {
        const user = await this.userModel.findOne({ userId }, { _id: 0, __v: 0 });
        if (utils.emptyCheck(user)) {
            throw new NotFoundException("user not found")
        }
        return user;
    }

    async deleteUser(userId: string) {
        const user = await this.userModel.deleteMany({ userId }, { _id: 0, __v: 0 });
        if (user?.["deletedCount"] === 0) {
            throw new NotFoundException("user not found")
        }
        return user
    }

    async getAllUsers() {
        const user = await this.userModel.find({}, { _id: 0, __v: 0 });
        if (utils.emptyCheck(user)) {
            throw new NotFoundException("users not found")
        }
        return user;
    }

    async userLogin(userLoginData: {}) {
        const user = await this.userModel.findOne({ "email": userLoginData?.["email"] }, { _id: 0 });
        if (!utils.emptyCheck(user)) {
            const hashPassword = user?.["password"] ?? "";
            const comparePassword = await utils.comparePasswordHash(userLoginData?.["password"], hashPassword);
            if (comparePassword) {
                return user;
            } else {
                throw new UnauthorizedException("login failed")
            }
        } else {
            throw new NotFoundException("users not found")
        }
    }
}
