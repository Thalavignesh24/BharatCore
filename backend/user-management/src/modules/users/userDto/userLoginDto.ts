

import { IsAlphanumeric, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, ValidateNested } from "class-validator"

export class UserLoginDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string

}

