
import { PartialType } from "@nestjs/mapped-types"
import { CreateUserDto } from "./userCreateDto"


export class UserUpdateDto extends PartialType(CreateUserDto) { }