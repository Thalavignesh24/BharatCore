import { Module } from '@nestjs/common';
import { LookupsController } from './lookups.controller';
import { LookupsService } from './lookups.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailLookupSchema } from './lookups.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "email_lookups", schema: EmailLookupSchema }
    ]),
  ],
  controllers: [LookupsController],
  providers: [LookupsService]
})
export class LookupsModule { }
