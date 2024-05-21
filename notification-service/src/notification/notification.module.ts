import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationConsumer } from './notification-consumer.service';
import { BullModule } from '@nestjs/bull';
import { QueueName } from './constants/queue-name.enum';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.NOTIFICATIONS,
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationConsumer],
})
export class NotificationModule {}
