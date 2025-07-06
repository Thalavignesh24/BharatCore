import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { EmailLookupDto } from './lookupDto/emailLookupDto';
import { LookupsService } from "./lookups.service"

@Controller('lookups')
export class LookupsController {
    constructor(private readonly lookupsService: LookupsService) {
    }
    @Post()
    emailLookup(@Body(ValidationPipe) emailLookupDto: EmailLookupDto) {
        return this.lookupsService.emailLookup(emailLookupDto)
    }
}
