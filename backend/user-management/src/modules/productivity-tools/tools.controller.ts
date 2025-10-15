
import { Body, Controller, Get, InternalServerErrorException, Post, ValidationPipe } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { SuccessMessage } from 'src/common/success-message.decorator';


@Controller('productivity-tools')
export class ToolsController {
        constructor(
                private readonly toolsService: ToolsService
        ) { }

        @SuccessMessage('Password is generated', 200)
        @Post('password-generator')
        passwordGenerator(@Body() requestedInputs: {}) {
                try {
                        return this.toolsService.passwordGenerator(requestedInputs);
                } catch (error) {
                        throw new InternalServerErrorException(error?.["message"]);
                }
        }

}