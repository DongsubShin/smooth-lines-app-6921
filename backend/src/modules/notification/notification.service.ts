import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Notification, NotificationStatus, NotificationType } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private notificationRepo: Repository<Notification>,
  ) {}

  async scheduleReminder(clientId: string, scheduledAt: Date) {
    const notification = this.notificationRepo.create({
      clientId,
      type: NotificationType.REMINDER,
      scheduledAt,
      status: NotificationStatus.PENDING,
    });
    return this.notificationRepo.save(notification);
  }

  // Cron job would call this
  async processPendingReminders() {
    const pending = await this.notificationRepo.find({
      where: {
        status: NotificationStatus.PENDING,
        scheduledAt: LessThanOrEqual(new Date()),
      },
    });

    for (const item of pending) {
      try {
        // Mock SMS logic
        console.log(`Sending SMS to client ${item.clientId}`);
        item.status = NotificationStatus.SENT;
        item.sentAt = new Date();
      } catch (error) {
        item.status = NotificationStatus.FAILED;
        item.errorMessage = error.message;
      }
      await this.notificationRepo.save(item);
    }
  }
}