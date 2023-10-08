import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly man: string;

  @IsString()
  @IsNotEmpty()
  readonly woman: string;

  @IsString()
  @IsNotEmpty()
  readonly child: string;

  @IsString()
  @IsNotEmpty()
  readonly sport: string;

  @IsString()
  @IsNotEmpty()
  readonly news: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
