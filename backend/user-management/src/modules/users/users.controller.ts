

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
    @SuccessMessage('users list', 200)
    getUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(":userId")
    @SuccessMessage('user details', 200)
    viewUsers(@Param("userId") id: string) {
        return this.usersService.getUser(id);
    }

    @Post()
    @SuccessMessage('user created successfully', 201)
    userCreate(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Patch(":userId")
    @SuccessMessage('user updated successfully', 200)
    userUpdate(@Param("userId") id: string, @Body(ValidationPipe) userUpdateDto: UserUpdateDto) {
        return this.usersService.updateUser(id, userUpdateDto);
    }

    @Delete(":userId")
    @SuccessMessage('user deleted successfully', 200)
    userDelete(@Param("userId") id: string) {
        return this.usersService.deleteUser(id);
    }
}
