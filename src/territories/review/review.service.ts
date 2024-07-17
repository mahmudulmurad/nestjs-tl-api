import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductReview, User } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClientProxy } from '@nestjs/microservices';
import { ReviewDto } from 'src/dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly reviewRepository: Repository<ProductReview>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject('LOGGER_SERVICE') private loggerService: ClientProxy,
  ) {}

  async allReviews(productId: string): Promise<ProductReview[]> {
    const reviews = await this.reviewRepository.find({
      where: { productId },
      relations: ['user', 'product'],
    });
    if (reviews.length === 0) {
      throw new NotFoundException('no reviews found');
    }
    return reviews;
  }

  async createReview(
    userId: string,
    productId: string,
    reviewDto: ReviewDto,
  ): Promise<ProductReview> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const newReview = new ProductReview();
    newReview.id = uuidv4();
    newReview.content = reviewDto.content;
    newReview.user = user;
    newReview.product = product;

    return await this.reviewRepository.save(newReview);
  }
}
