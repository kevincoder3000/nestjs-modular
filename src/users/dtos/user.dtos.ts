import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the name of user' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly surnames: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly birthday: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
