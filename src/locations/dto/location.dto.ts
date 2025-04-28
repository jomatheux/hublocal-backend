import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Matches(/^\d{8}$/, { message: 'CEP must be an 8-digit number' })
  cep: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}

export class UpdateLocationDto {
  @IsString()
  name?: string;

  @Matches(/^\d{8}$/, { message: 'CEP must be an 8-digit number' })
  cep?: string;

  @IsString()
  street?: string;

  @IsString()
  number?: string;

  @IsString()
  district?: string;

  @IsString()
  city?: string;

  @IsString()
  state?: string;
}