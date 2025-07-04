import { RedisService } from '../redis/redis.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {SampleData,DataCollection} from "../upload/Schemas/file.schema";
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';


@Injectable()
export class RetryServiceService {
    private readonly client:Redis;
 constructor(
     
       @InjectModel(SampleData.name) private readonly SampleModel:Model<SampleData>
 ){
    this.client=new Redis();
 }

 async Retry():Promise<any>{
    return await this.client.get('*');
 }

}
 