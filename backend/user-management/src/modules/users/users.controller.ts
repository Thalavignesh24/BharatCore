

import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './userDto/userCreateDto';
import { UserUpdateDto } from './userDto/userUpdateDto';
import { UserLoginDto } from './userDto/userLoginDto';
import { UsersService } from './users.service';
import { SuccessMessage } from 'src/common/success-message.decorator';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    @Get()
    @SuccessMessage('users list', 200)
    async getUsers() {
        try {
            return await this.usersService.getAllUsers();
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Get(":userId")
    @SuccessMessage('user details', 200)
    async viewUsers(@Param("userId") id: string) {
        try {
            return await this.usersService.getUser(id);
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Post()
    async userCreate(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        try {
            return await this.usersService.createUser(createUserDto);
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Patch(":userId")
    @SuccessMessage('user updated successfully', 200)
    async userUpdate(@Param("userId") id: string, @Body(ValidationPipe) userUpdateDto: UserUpdateDto) {
        try {
            return await this.usersService.updateUser(id, userUpdateDto);
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Delete(":userId")
    @SuccessMessage('user deleted successfully', 200)
    async userDelete(@Param("userId") id: string) {
        try {
            return await this.usersService.deleteUser(id);
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Post('/login')
    @SuccessMessage('user login successfully', 200)
    async getLogin(@Body(ValidationPipe) userLoginData: UserLoginDto) {
        try {
            return await this.usersService.userLogin(userLoginData)
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }
}
