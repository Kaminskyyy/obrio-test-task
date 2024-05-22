import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { UserDto } from './dto/user.dto';
import { QueueName } from './constants/queue-name.enum';
import { JobName } from './constants/job-name.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private readonly pushNotificationDelay: number;

  constructor(
    @InjectQueue(QueueName.NOTIFICATIONS)
    private readonly notificationsQueue: Queue,
    private readonly configService: ConfigService,
  ) {
    this.pushNotificationDelay = +configService.get('PUSH_NOTIFICATION_DELAY');
  }

  async scheduleNewUserNotification(user: UserDto): Promise<void> {
    await this.notificationsQueue.add(
      JobName.SEND_NEW_USER_NOTIFICATION,
      user,
      {
        delay: this.pushNotificationDelay,
      },
    );
  }
}
