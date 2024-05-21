import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { RabbitMQConfigService } from './rabbitmq-config.service';
import { NOTIFICATION_SERVICE } from 'src/constants';

@Module({
  providers: [
    RabbitMQConfigService,
    {
      provide: NOTIFICATION_SERVICE,
      useFactory: (rabbitmqConfigService: RabbitMQConfigService) => {
        const options = rabbitmqConfigService.getOptions();
        return ClientProxyFactory.create(options);
      },
      inject: [RabbitMQConfigService],
    },
  ],
  exports: [NOTIFICATION_SERVICE],
})
export class RabbitmqModule {}
