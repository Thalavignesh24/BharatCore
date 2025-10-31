

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({
        required: true
    })
    userId: string

    @Prop({ required: true })
    name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    confirmPassword: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
