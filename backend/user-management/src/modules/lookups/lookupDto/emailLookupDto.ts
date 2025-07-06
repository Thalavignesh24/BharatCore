
import { IsAlphanumeric, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, ValidateNested } from "class-validator"
export class EmailLookupDto {

    @IsNotEmpty()
    @IsEmail()
    email: string
}