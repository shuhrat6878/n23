import {  IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsNumber()
    @IsNotEmpty()
    year:number;
    
    
    @IsNumber()
    @IsNotEmpty()
    user_id:number
    

}

