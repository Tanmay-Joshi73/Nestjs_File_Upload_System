import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import Redis from 'ioredis';
import {SampleData} from "../upload/Schemas/file.schema";
import {redis as redisDTO} from "./redis.dto"
import {RetryServiceService} from "../retry-service/retry-service.service"
import { Cron, CronExpression } from '@nestjs/schedule';
;
@Injectable()
export class RedisService {
  private readonly client = new Redis();
 private readonly RetryMethods:RetryServiceService;
 constructor(
    @InjectModel(SampleData.name)
    private readonly mongooseModel: Model<SampleData>,
  ) {}
  
   
 
 async Set(Data:redisDTO):Promise<any>{
   //Currently everything on the redis is about the pending data;
   //so store everything into it no need to mention something like key pendig or not etc;
   const ExistingCacheData=await this.client.get(Data.Name);
   if(ExistingCacheData) {return ;}
   const value={
      Size:Data.Size,
      Status:Data.Status
   }
   await  this.client.set(Data.Name,JSON.stringify(value))
 }

 //Function to perfom TLS
@Cron(CronExpression.EVERY_5_SECONDS)
async TLS(): Promise<any> {
  const keys: string[] = await this.client.keys('*');

  for (const key of keys) {
    console.log(key)
    const value = await this.client.get(key);
    console.log(value)
    try {
      ///Try to find data in mongoDB for reuploading;
      // const ExistingData=await this.mongooseModel.findOne({Name:key});
      // console.log(ExistingData)
    } catch (e) {
      console.log(`Key: ${key}, Raw Value: ${value}`);
    }
  }
}
}
