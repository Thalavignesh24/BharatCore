
import { IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class PhoneLookupDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 3)
    phoneCode: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 10)
    phoneNumber: string;
}
