
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { EmailLookupDto } from './lookupDto/emailLookupDto';
import { LookupsService } from "./lookups.service"
import { SuccessMessage } from 'src/common/success-message.decorator';
import { PhoneLookupDto } from './lookupDto/phoneLookupDto';

@Controller('lookups')
export class LookupsController {
    constructor(private readonly lookupsService: LookupsService) { }

    @Post("/email")
    @SuccessMessage('emailLookup details', 200)
    emailLookup(@Body(ValidationPipe) emailLookupDto: EmailLookupDto) {
        return this.lookupsService.emailLookup(emailLookupDto)
    }

    @Post("/phone")
    @SuccessMessage('phoneLookup details', 200)
    phoneLookup(@Body(ValidationPipe) phoneLookupDto: PhoneLookupDto) {
        return this.lookupsService.phoneLookup(phoneLookupDto)
    }
}
