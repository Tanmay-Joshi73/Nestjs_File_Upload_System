import { Module } from '@nestjs/common';
import {RedisService} from "./redis.service";
import { MongooseModule } from '@nestjs/mongoose';
import {DataCollection,SampleData} from "../upload/Schemas/file.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SampleData.name, schema: DataCollection }
    ])
    
  ],
  providers: [RedisService],
  exports: [RedisService], // 👈 make it available outside this module
})
export class RedisModule {}
