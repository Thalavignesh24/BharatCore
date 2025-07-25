
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "users", schema: UserSchema }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
