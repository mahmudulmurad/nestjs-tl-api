import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, User } from '../entities';
import { CreateProductDto } from '../dto/create-product.dot';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(productDto: CreateProductDto, userId: string): Promise<Product> {
    const { productName } = productDto;
    const isExist = await this.productRepository.findOne({
      where: { productName },
    });
    if (isExist) {
      throw new ConflictException(
        'product already taken. Please choose a different product name.',
      );
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const product = new Product();
    product.productName = productDto.productName;
    product.categoryId = productDto.categoryId;
    product.categoryName = productDto.categoryName;
    product.price = productDto.price;
    product.status = productDto.status;
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
