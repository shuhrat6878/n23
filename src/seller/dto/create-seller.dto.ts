import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSellerDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNumber()
    age: number
}
