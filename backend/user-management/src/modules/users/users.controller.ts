

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
    getUsers() {
        try {
            return this.usersService.getAllUsers();
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Get(":userId")
    @SuccessMessage('user details', 200)
    viewUsers(@Param("userId") id: string) {
        try {
            return this.usersService.getUser(id);
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Post()
    @SuccessMessage('user created successfully', 201)
    userCreate(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        try {
            return this.usersService.createUser(createUserDto);
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Patch(":userId")
    @SuccessMessage('user updated successfully', 200)
    userUpdate(@Param("userId") id: string, @Body(ValidationPipe) userUpdateDto: UserUpdateDto) {
        try {
            return this.usersService.updateUser(id, userUpdateDto);
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Delete(":userId")
    @SuccessMessage('user deleted successfully', 200)
    userDelete(@Param("userId") id: string) {
        try {
            return this.usersService.deleteUser(id);
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }

    @Post('/login')
    @SuccessMessage('user login successfully', 200)
    getLogin(@Body(ValidationPipe) userLoginData: UserLoginDto) {
        try {
            return this.usersService.userLogin(userLoginData)
        } catch (error) {
            throw new InternalServerErrorException(error?.["message"]);
        }

    }
}
