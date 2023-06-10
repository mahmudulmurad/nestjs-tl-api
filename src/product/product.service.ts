import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, User } from '../entities';
import { CreateProductDto } from '../dto/create-product.dot';
import { log } from 'console';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(productDto: CreateProductDto, user: User): Promise<Product> {
    const { productName, categoryId, categoryName, price, status } = productDto;
    log(user)
    const isExist = await this.productRepository.findOne({ where: { productName } });
    if (isExist) {
        throw new ConflictException('product already taken. Please choose a different product name.');
    }

    const product = new Product();
    product.productName = productName;
    product.categoryId = categoryId;
    product.categoryName = categoryName;
    product.price = price;
    product.status = status;
    product.user = user;

    return this.productRepository.save(product);
  }

//   async update(id: number, product: Product): Promise<Product> {
//     await this.productRepository.update(id, product);
//     return this.productRepository.findOne(id);
//   }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async deleteProducts(ids: number[]): Promise<void> {
    await this.productRepository.delete(ids);
  }
}
