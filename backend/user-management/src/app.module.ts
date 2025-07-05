import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './common/config';

@Module({
  imports: [
    MongooseModule.forRoot(new Config().USERDB()),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
