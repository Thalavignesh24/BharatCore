import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LookupsModule } from './modules/lookups/lookups.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './common/config';
import { ToolsModule } from './modules/productivity-tools/tools.module';

@Module({
  imports: [
    MongooseModule.forRoot(new Config().USERS_DB()),
    MongooseModule.forRoot(new Config().IDENTITY_DB(), {
    connectionName: "identity"
    }),
    UsersModule,
    LookupsModule,
    ToolsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
