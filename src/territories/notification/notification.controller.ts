import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/auth';
import { ResponseService } from 'src/service/response.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Expo-Notification')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('/create-review/:userId')
  async signUp(@Param('userId') userId: string, @Body() expoAppToken: string) {
    const review = await this.notificationService.createExpoNotification(
      userId,
      expoAppToken,
    );

    return this.responseService.toDtoResponse(
      HttpStatus.CREATED,
      'Review Creation successful',
      review,
    );
  }
}
