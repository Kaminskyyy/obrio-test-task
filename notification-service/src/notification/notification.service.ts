import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { UserDto } from './dto/user.dto';
import { QueueName } from './constants/queue-name.enum';
import { JobName } from './constants/job-name.enum';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue(QueueName.NOTIFICATIONS)
    private readonly notificationsQueue: Queue,
  ) {}

  async scheduleNewUserNotification(user: UserDto) {
    await this.notificationsQueue.add(
      JobName.SEND_NEW_USER_NOTIFICATION,
      user,
      {
        delay: 5000,
      },
    );
  }
}
