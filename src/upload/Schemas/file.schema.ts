import {Document} from "mongoose"
import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
@Schema()
export class SampleData extends Document{
@Prop({required:true})
Name:string;
@Prop({required:true})
Size:number;
@Prop({required:true,default:false})
Status:boolean
@Prop({required:true})
CreatedAt:Date

}
export const DataCollection=SchemaFactory.createForClass(SampleData);
