import { Controller,Post,Body,UploadedFile,UseInterceptors,HttpException ,Get} from '@nestjs/common';
import {upload} from "./upload.dto"
import {Sample} from "./Sample.dto"
import { FileInterceptor } from '@nestjs/platform-express';
import {UploadService} from "./upload.service"
import {RedisService} from "../redis/redis.service"
@Controller('upload')
export class UploadController {
    constructor(private readonly upload:UploadService,private readonly redisProcess:RedisService){}
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async Upload(@UploadedFile() file:Express.Multer.File){
        try{
        if(!file) throw new HttpException("Helllo Brother",202)
        const ExistingFile=await this.upload.FindFile(file.originalname)   
        throw new Error("Hey just fucking error arrived");
        if(ExistingFile){
            return "Hey file is already present you cannot add same file with the same name" ;
        }
        //custom error donig;
    
        return this.upload.UploadFile(file)
    }
    catch(Error){
        const pendingFiles={
            Name:file.originalname,
            Size:file.size,
            Status:false
        }
        console.log("Before writing to the Redis function")
        return this.redisProcess.Set(pendingFiles);
    }
}


    @Get('/FindAll')
    Show():any{
        return this.upload.find()
    }

   
    


}