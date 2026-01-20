import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'Urgent', description: 'The name of the tag' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
