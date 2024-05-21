import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UserDto } from './dto/user.dto';
import { QueueName } from './constants/queue-name.enum';
import { JobName } from './constants/job-name.enum';

@Processor(QueueName.NOTIFICATIONS)
export class NotificationConsumer {
  @Process(JobName.SEND_NEW_USER_NOTIFICATION)
  async sendNewUserNotification(job: Job<UserDto>) {
    console.log('CONSUMER: ', job.data);
  }
}
