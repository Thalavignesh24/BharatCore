
import { Type } from "class-transformer";
import { IsAlphanumeric, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, ValidateNested } from "class-validator"


class RoleDto {
    @IsNotEmpty()
    @IsString()
    name: string
}

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string


    @IsNotEmpty()
    @IsStrongPassword()
    confirmPassword: string

    // @IsNotEmpty()
    // @ValidateNested()               // ✅ Tell class-validator to go inside
    // @Type(() => RoleDto)            // ✅ Tell class-transformer how to create the class
    // role: RoleDto;
}

