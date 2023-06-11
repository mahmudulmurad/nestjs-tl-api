import {IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductDto {
   
    @IsOptional()
    @IsString()
    productName?: string;
  
    @IsOptional()
    @IsNumber()
    categoryId?: number;
  
    @IsOptional()
    @IsString()
    categoryName?: string;
  
    @IsOptional()
    @IsNumber()
    price?: number;
  
    @IsOptional()
    @IsBoolean()
    status?: boolean;
  }