import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  @Length(3, 100)
  firstName: string;

  @IsString()
  @Length(3, 100)
  lastName: string;

  @IsEmail()
  email: string;
}
