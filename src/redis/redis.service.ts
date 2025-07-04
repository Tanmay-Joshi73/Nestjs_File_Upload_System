import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import {redis as redisDTO} from "./redis.dto"
import {RetryServiceService} from "../retry-service/retry-service.service";
@Injectable()
export class RedisService {
 private client:Redis;
 private readonly RetryMethods:RetryServiceService;
 constructor(){
    this.client=new Redis();
 }
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
 async TLS():Promise<any>{
   return this.RetryMethods.Retry();
 }
}
