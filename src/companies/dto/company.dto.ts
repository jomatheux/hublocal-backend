import { IsNotEmpty, IsString, IsUrl, Matches } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  website: string;

  @IsNotEmpty()
  @Matches(/^\d{14}$/, { message: 'CNPJ must be a 14-digit number' })
  cnpj: string;
}

export class UpdateCompanyDto {
  @IsString()
  name?: string;

  @IsUrl()
  website?: string;

  @Matches(/^\d{14}$/, { message: 'CNPJ must be a 14-digit number' })
  cnpj?: string;
}