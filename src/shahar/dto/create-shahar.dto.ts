import {  IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateShaharDto {
    @IsString()
    @IsNotEmpty()
    name:string;


    @IsNumber()
    @IsNotEmpty()
    user_id:number
}
