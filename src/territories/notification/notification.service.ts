import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Notification, User } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ExpoNotificationDto } from 'src/dto/expo-notofication.dto';
import { QueryBuilderService } from 'src/service/queryBuilder.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly queryBuilderService: QueryBuilderService,
  ) {}

  async createExpoNotification(
    notificationDto: ExpoNotificationDto,
    userId: string,
  ): Promise<Notification> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'username'],
    });

    const isExist = await this.notificationRepository.findOne({
      where: { user },
    });

    if (isExist) {
      throw new ConflictException(
        'User already agreed for expo notification service',
      );
    }

    const newNotification = this.notificationRepository.create({
      ...notificationDto,
      user,
    });
    newNotification.id = uuidv4();

    return await this.notificationRepository.save(newNotification);
  }

  async getExpoNotification(userId: string): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      select: {
        user: {
          id: true,
          username: true,
        },
      },
    });

    return notifications;
  }
}
