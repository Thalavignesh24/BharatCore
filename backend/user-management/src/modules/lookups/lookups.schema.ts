

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
