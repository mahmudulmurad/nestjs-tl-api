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
  Req,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../entities';
import { CreateProductDto } from '../dto/create-product.dot';
import { AuthGuard } from '../auth';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CustomRequest } from '../interface/customRequest.interface';
import { ResponseService } from 'src/service/response.service';
import { ResponseDto } from 'src/dto/response/response.dto';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly responseService: ResponseService,
    ) {}

  @Get('all-product')
  async getAllProducts(): Promise<ResponseDto> {
    const productsDto = await this.productService.findAll();
    return this.responseService.toDtosResponse(HttpStatus.OK, 'List of all products', productsDto);
  }

  @Get('current-user/all-product')
  async getAllProductsOfUser(@Req() request: CustomRequest): Promise<Product[]> {
    const userId = request.user?.id
    return this.productService.findAllProductsOfUser(userId);
  }

  @Post('create-product')
  async createProduct(@Req() request: CustomRequest, @Body() product: CreateProductDto): Promise<ResponseDto> {
    const userId = request.user?.id
    const newProduct = this.productService.create(product, userId);
    return this.responseService.toDtoResponse(
      HttpStatus.CREATED,
      'Product Creation successful',
      newProduct
    );
  }

  @Patch('update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<string> {
    return await this.productService.remove(id);
  }

  @Delete('batch-delete')
  async batchDeleteProducts(@Body() data: { ids: string[] }): Promise<string> {
    const arrayOfId = data?.ids;
    return await this.productService.deleteProducts(arrayOfId);
  }
}
