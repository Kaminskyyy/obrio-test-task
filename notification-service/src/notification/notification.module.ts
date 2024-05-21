import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationConsumer } from './notification-consumer.service';
import { BullModule } from '@nestjs/bull';
import { QueueName } from './constants/queue-name.enum';
import { HttpModule } from '@nestjs/axios';
import { PushNotificationService } from './push-notification.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.NOTIFICATIONS,
    }),
    HttpModule,
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationConsumer,
    PushNotificationService,
  ],
})
export class NotificationModule {}
