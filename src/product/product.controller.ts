// product.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../entities';
import { CreateProductDto } from '../dto/create-product.dot';
import { AuthGuard } from '../auth';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

 
  @Get('all-product')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post('create-product')
  async createProduct(
    @Body() product: CreateProductDto
  ): Promise<Product> {
    return this.productService.create(product);
  }

    @Patch('update/:id')
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
      return this.productService.updateProduct(id, updateProductDto);
    }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<string> {
    return await this.productService.remove(id);
  }

  @Delete('batch-delete')
  async batchDeleteProducts(@Body() data: {ids: string[]}): Promise<string> {
    const arrayOfId =  data?.ids
    return await this.productService.deleteProducts(arrayOfId);
  }
}
