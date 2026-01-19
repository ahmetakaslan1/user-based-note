import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
