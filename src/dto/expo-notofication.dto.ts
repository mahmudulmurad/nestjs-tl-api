import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExpoNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  expoAppToken: string;
}
