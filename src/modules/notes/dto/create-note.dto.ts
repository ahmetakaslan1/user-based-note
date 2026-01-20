import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'Meeting Notes' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Discuss project roadmap...' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ example: [1, 2], required: false })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[];
}
