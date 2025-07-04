import { Module,Injectable } from '@nestjs/common';
import{InjectModel,MongooseModule} from "@nestjs/mongoose";
import {Model} from "mongoose";
import { UploadController } from './upload.controller';
import {SampleData,DataCollection} from "./Schemas/file.schema"
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import {RedisModule} from "../redis/redis.module";
import {diskStorage} from "multer"
import {extname } from 'path'
import mime from "mime"
const { v4: uuidv4 } = require('uuid');

@Module({
  imports:[
   MulterModule.register({
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
  
    if (!file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
      cb(new Error('Only PDf are Allowed!'), false);
    } else {
      cb(null, true);
    }
  },
}),
MongooseModule.forFeature([{name:SampleData.name,schema:DataCollection}]),
RedisModule


  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
