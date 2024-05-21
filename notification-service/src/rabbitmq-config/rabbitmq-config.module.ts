import { Module } from '@nestjs/common';
import { RabbitmqConfigService } from './rabbitmq-config.service';

@Module({
  providers: [RabbitmqConfigService],
  exports: [RabbitmqConfigService],
})
export class RabbitmqConfigModule {}
