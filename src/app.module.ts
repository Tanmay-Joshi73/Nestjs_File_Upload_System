import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import {MongooseModule} from "@nestjs/mongoose"
import {ScheduleModule} from "@nestjs/schedule"
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { RetryServiceService } from './retry-service/retry-service.service';
// import { RedisModule } from './retry-service/retry-service.module';
@Module({
  imports: [UploadModule,
    MongooseModule.forRoot("mongodb://localhost:27017"),
    ScheduleModule.forRoot(), //This Enables the Cron Job
    RedisModule  ],
  controllers: [AppController],
  providers: [AppService, RedisService, RetryServiceService],
})
export class AppModule {}
