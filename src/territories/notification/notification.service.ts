import { Injectable } from '@nestjs/common';
import { Notification } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async createExpoNotification(
    userId: string,
    expoAppToken: string,
  ): Promise<Notification> {
    console.log(userId, expoAppToken);

    const newReview = new Notification();
    newReview.id = uuidv4();

    return await this.notificationRepository.save(newReview);
  }
}
