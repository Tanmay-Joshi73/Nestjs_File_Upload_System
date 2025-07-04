import { Module } from '@nestjs/common';
import {RetryServiceService} from "./retry-service.service";
// import { RetryServiceService } from './retry-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import {DataCollection,SampleData} from "../upload/Schemas/file.schema";

@Module({
     imports: [
    MongooseModule.forFeature([
      { name: SampleData.name, schema: DataCollection }
    ])
    
  ],
  providers: [ RetryServiceService],
  exports: [RetryServiceService], // 👈 make it available outside this module
})
export class RedisModule {}
