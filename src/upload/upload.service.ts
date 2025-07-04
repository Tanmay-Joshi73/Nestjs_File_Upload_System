import { Injectable } from '@nestjs/common';
import {SampleData} from "./Schemas/file.schema"
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose"

@Injectable()
export class UploadService {
    constructor(
        @InjectModel(SampleData.name) private SampleModel:Model<SampleData>
    ){}

    async Create(data: {
    Name: string;
    Age: number;
    Administration: string
  }): Promise<SampleData> {
    const newUser = new this.SampleModel(data);
    console.log(newUser)
     return await newUser.save();
     
  }
  async find():Promise<SampleData[]>{
    return this.SampleModel.find().exec()

  }
 async UploadFile(file:Express.Multer.File):Promise<SampleData>{
    
    const newFile=new this.SampleModel({
        Name:file.originalname,
        Size:file.size,
        Status:true,
        CreatedAt:Date.now()
    })
    return await newFile.save()
 }
 
 async FindFile(Name:string):Promise<any>{
  const ExistingFile=await this.SampleModel.findOne({Name:Name})
  return !!ExistingFile;
 }
async TLS():Promise<any>{
  
}

}