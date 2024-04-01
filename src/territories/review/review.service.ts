import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductReview } from '../../entities';
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
    @Inject('LOGGER_SERVICE') private loggerService: ClientProxy,
  ) {}

  async allReviews(productId: string): Promise<ProductReview[]> {
    const reviews = await this.reviewRepository.find({
      where: { product: { id: productId } },
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
    const newReview = new ProductReview();
    newReview.id = uuidv4();
    newReview.content = reviewDto.content;
    newReview.userId = userId;
    newReview.productId = productId;
    return await this.reviewRepository.save(newReview);
  }
}
