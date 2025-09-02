import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGuruxDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsNumber()
    @IsNotEmpty()
    facultyId:number
}
