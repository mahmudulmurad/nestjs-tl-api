import { IsNotEmpty, IsString } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
