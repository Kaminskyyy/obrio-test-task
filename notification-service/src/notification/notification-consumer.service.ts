import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserDto } from './dto/user.dto';
import { QueueName } from './constants/queue-name.enum';
import { JobName } from './constants/job-name.enum';
import { PushNotificationService } from './push-notification.service';

@Processor(QueueName.NOTIFICATIONS)
export class NotificationConsumer {
  constructor(
    private readonly pushNotificationsService: PushNotificationService,
  ) {}

  @Process(JobName.SEND_NEW_USER_NOTIFICATION)
  async sendNewUserNotification(job: Job<UserDto>): Promise<void> {
    await this.pushNotificationsService.sendNewUserNotification(job.data);
  }
}
