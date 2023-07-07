import { Allow } from 'class-validator';
import { ActiveStatus } from 'src/enum/active.enum';

export abstract class BaseDto {
  @Allow()
  id: string;

  @Allow()
  createAt: Date | null;

  @Allow()
  updatedAt: Date | null;
}
