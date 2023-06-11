// create-product.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';
import { User } from 'src/entities';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  status?: boolean;

  @IsNotEmpty()
  user: User;
}
