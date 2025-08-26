import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message:"Fulname kiritish kerak"
  })
  full_name: string;

  @IsEmail()
  @IsNotEmpty({
    message: "Email kiritish kerak"
  })
  email: string;
}
