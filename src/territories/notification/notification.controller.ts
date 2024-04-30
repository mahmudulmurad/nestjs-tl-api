import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Req,
  Get,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/auth';
import { ResponseService } from 'src/service/response.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/interface/customRequest.interface';
import { ExpoNotificationDto } from 'src/dto/expo-notofication.dto';

@ApiTags('Expo-Notification')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('/create-expo-notofication')
  async signUp(
    @Req() request: CustomRequest,
    @Body() notificationDto: ExpoNotificationDto,
  ) {
    const userId = request.user?.id;
    const notification = await this.notificationService.createExpoNotification(
      notificationDto,
      userId,
    );

    return this.responseService.toDtoResponse(
      HttpStatus.CREATED,
      'Expo Notification Creation successful',
      notification,
    );
  }

  @Get('/get-expo-notofication')
  async notifications(@Req() request: CustomRequest) {
    const userId = request.user?.id;
    const notifications = await this.notificationService.getExpoNotification(
      userId,
    );

    return this.responseService.toDtosResponse(
      HttpStatus.OK,
      'List of Expo Notification',
      notifications,
    );
  }
}
