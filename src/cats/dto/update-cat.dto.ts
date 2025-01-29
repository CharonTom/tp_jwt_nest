import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  imageAlt: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
