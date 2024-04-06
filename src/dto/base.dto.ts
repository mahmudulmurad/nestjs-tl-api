import { Allow } from 'class-validator';

export abstract class BaseDto {
  @Allow()
  id: string;

  @Allow()
  createAt: Date | null;

  @Allow()
  updatedAt: Date | null;
}
