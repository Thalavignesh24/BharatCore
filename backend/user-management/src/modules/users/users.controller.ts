

import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './userDto/userCreateDto';
import { UserUpdateDto } from './userDto/userUpdateDto';
import { UsersService } from './users.service';
import { SuccessMessage } from 'src/common/success-message.decorator';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    @Get()
    getUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(":userId")
    @SuccessMessage('User details')
    viewUsers(@Param("userId") id: string) {
        return this.usersService.getUser(id);
    }

    @Post()
    userCreate(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Patch(":userId")
    userUpdate(@Param("userId") id: string, @Body(ValidationPipe) userUpdateDto: UserUpdateDto) {
        return this.usersService.updateUser(id, userUpdateDto);
    }

    @Delete(":userId")
    userDelete(@Param("userId") id: string) {
        return this.usersService.deleteUser(id);
    }
}
