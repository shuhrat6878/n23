import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFacultyDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    unversityId:number;
}
