
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';

@Module({
        imports: [
                MongooseModule.forFeature([

                ]),
        ],
        controllers: [ToolsController],
        providers: [ToolsService]
})
export class ToolsModule { }
