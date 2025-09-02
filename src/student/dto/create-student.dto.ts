import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    fullname:string;
    
    @IsNumber()
    @IsNotEmpty()
    age:number;
    
    @IsNumber()
    @IsNotEmpty()
    guruxId:number
}
