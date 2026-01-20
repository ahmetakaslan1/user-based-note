import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Work', description: 'The name of the category' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '#FF5733',
    description: 'The color hex code for the category',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;
}
