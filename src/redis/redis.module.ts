import { Module } from '@nestjs/common';
import {RedisService} from "./redis.service";

@Module({
  providers: [RedisService],
  exports: [RedisService], // 👈 make it available outside this module
})
export class RedisModule {}
