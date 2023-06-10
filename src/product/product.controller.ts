// product.controller.ts
import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, User } from '../entities';
import { AuthMiddleware } from '../auth';
import { CreateProductDto } from '../dto/create-product.dot';
import { GetUser } from '../auth/get-user.decorator';

@Controller('products')
@UseGuards(AuthMiddleware)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all-product')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }


  @Post('create-product')
  @UseGuards(AuthMiddleware)
  async createProduct(@Body() product: CreateProductDto, @GetUser() user: User): Promise<Product> {
    return this.productService.create(product,user);
  }

//   @Patch('update/:id')
//   async updateProduct(@Param('id') id: number, @Body() product: Partial<Product>): Promise<Product> {
//     return this.productService.update(id, product);
//   }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    await this.productService.remove(id);
  }

  @Delete('batch-delete')
  async batchDeleteProducts(@Body() ids: number[]): Promise<void> {
    await this.productService.deleteProducts(ids);
  }
}
