import { Module } from '@nestjs/common';
import {RetryServiceService} from "./retry-service.service";
// import { RetryServiceService } from './retry-service.service';

@Module({
  providers: [ RetryServiceService],
  exports: [RetryServiceService], // 👈 make it available outside this module
})
export class RedisModule {}
