import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from 'src/dto/review.dto';
import { AuthGuard } from 'src/auth';
import { ResponseService } from 'src/service/response.service';

@UseGuards(AuthGuard)
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly responseService: ResponseService,
  ) {}

  @Get('/:productId')
  async getHello(@Param('productId') productId: string) {
    const reviews = await this.reviewService.allReviews(productId);

    return this.responseService.toDtosResponse(
      HttpStatus.OK,
      'List of all reviews of product',
      reviews,
    );
  }

  @Post('/create-review/:userId/:productId')
  async signUp(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() reviewDto: ReviewDto,
  ) {
    const review = await this.reviewService.createReview(
      userId,
      productId,
      reviewDto,
    );

    return this.responseService.toDtoResponse(
      HttpStatus.CREATED,
      'Review Creation successful',
      review,
    );
  }
}
