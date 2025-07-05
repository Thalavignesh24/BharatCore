

import { Injectable } from '@nestjs/common';
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
                return responseHandler.successResponse(201, "user created successfully", userDetails);
            } else {
                return responseHandler.failureResponse(422, "failed to create user", {});
            }

        } catch (error) {
            console.log(error);
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
            return responseHandler.successResponse(200, "user updated successfully", {})
        } else {
            return responseHandler.successResponse(200, "user not found", {});
        }
    }

    async getUser(userId: string) {
        return  await this.userModel.findOne({ userId }, { _id: 0, __v: 0 });

        // const viewUser = await this.userModel.findOne({ userId }, { _id: 0, __v: 0 });
        // if (viewUser) {
        //     return responseHandler.successResponse(200, "user details", viewUser)
        // } else {
        //     return responseHandler.successResponse(200, "user not found", {});
        // }
    }

    async deleteUser(userId: string) {
        const user = await this.userModel.deleteMany({ userId }, { _id: 0, __v: 0 });
        if (user?.["deletedCount"] !== 0) {
            return responseHandler.successResponse(200, "user deleted successfully", {})
        } else {
            return responseHandler.successResponse(200, "user not found", {});
        }
    }

    async getAllUsers() {
        return await this.userModel.find({}, { _id: 0, __v: 0 });
        const users = await this.userModel.find({}, { _id: 0, __v: 0 });
        if (!utils.emptyCheck(users)) {
            return responseHandler.successResponse(200, "users list", users)
        } else {
            return responseHandler.successResponse(200, "no users found", users);
        }
    }
}
