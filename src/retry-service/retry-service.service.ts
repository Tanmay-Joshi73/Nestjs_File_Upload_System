import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import Redis from 'ioredis';
import { SampleData } from '../upload/Schemas/file.schema'; // Make sure this is correct

@Injectable()
export class RetryServiceService {
  private readonly client: Redis;

  constructor(
    // @InjectModel(SampleData.name) private readonly ModelData: Model<SampleData>
  ) {
    this.client = new Redis(); // Redis client connected to localhost:6379 by default
  }


@Cron(CronExpression.EVERY_30_SECONDS) ///This line of code works every 30 seconds
  async Retry(): Promise<void> {
    console.log('🔁 Cron is running every 30 seconds...');
    // Your logic here
  }
}
