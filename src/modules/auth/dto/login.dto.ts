import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ApiTags('Auths')
export class LoginDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
