
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ToolsService } from './tools.service';


@Controller('productivity-tools')
export class ToolsController {
        constructor(
                private readonly toolsService:ToolsService
        ){}

        @Post('password-generator')
        passwordGenerator(@Body() requestedInputs:{}) {
                try {
                     return  this.toolsService.passwordGenerator(requestedInputs);
                } catch (error) {
                        console.log(error);
                }
        }

}