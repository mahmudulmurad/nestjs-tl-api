import { HttpStatus } from '@nestjs/common';
import { PayloadDto } from './payload.dto';
import { ErrorDto } from './error.dto';

export class ResponseDto {
  constructor(
    public nonce: number,
    public status: HttpStatus,
    public message: string,
    public error?: ErrorDto,
    public payload?: PayloadDto,
  ) {}
}
