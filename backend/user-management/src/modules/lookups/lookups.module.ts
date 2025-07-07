import { Module } from '@nestjs/common';
import { LookupsController } from './lookups.controller';
import { LookupsService } from './lookups.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailLookupSchema, PhoneLookupSchema } from './lookups.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "email_lookups", schema: EmailLookupSchema },
      { name: "phone_lookups", schema: PhoneLookupSchema }
    ]),
  ],
  controllers: [LookupsController],
  providers: [LookupsService]
})
export class LookupsModule { }
