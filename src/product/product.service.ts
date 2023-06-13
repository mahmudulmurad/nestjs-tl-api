import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities';
import { CreateProductDto } from '../dto/create-product.dot';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProductDto } from 'src/dto/update-product.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    const { productName } = productDto;
    const isExist = await this.productRepository.findOne({
      where: { productName },
    });
    if (isExist) {
      throw new ConflictException(
        'product already taken. Please choose a different product name.',
      );
    }
    const product = this.productRepository.create(productDto);
    product.id = uuidv4(); 
    return await this.productRepository.save(product);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new ConflictException(
        'product not found!!',
      );
    }
    const updatedProduct = Object.assign(product, updateProductDto);
    return this.productRepository.save(updatedProduct);
  }

  async remove(id: string): Promise<string> {
    const isExist = await this.productRepository.findOne({
      where: { id },
    });
    if (!isExist) {
      throw new ConflictException(
        'product does not exist.',
      );
    }
    await this.productRepository.delete(id);
    return 'Product has been deleted'
  }

  async deleteProducts(ids: string[]): Promise<string> {
    const result = await this.productRepository
    .createQueryBuilder()
    .delete()
    .from(Product)
    .where("id IN (:...ids)", { ids })
    .execute();

    if (result.affected > 0) {
      if (result.affected === ids.length) {
        return 'Selected products have been deleted';
      } else {
        return `Some products have been deleted, but not all. (${result.affected} out of ${ids.length} deleted)`;
      }
    } else {
      throw new NotFoundException('No products found with the provided IDs');
    }
  
  }
}
