

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EmailLookup extends Document {

    @Prop({
        required: true
    })
    emailRequestId: string

    @Prop({ unique: true, required: true })
    emailValue: string;

    @Prop({ type: Object })
    emailLookupData: object;
}

export const EmailLookupSchema = SchemaFactory.createForClass(EmailLookup);


@Schema()
export class PhoneLookup extends Document {

    @Prop({
        required: true
    })
    phoneRequestId: string

    @Prop({ unique: true, required: true })
    phoneValue: string;

    @Prop({ type: Object })
    phoneLookupData: object;
}

export const PhoneLookupSchema = SchemaFactory.createForClass(PhoneLookup);

