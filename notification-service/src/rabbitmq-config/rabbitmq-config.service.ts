import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitmqConfigService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(): MicroserviceOptions {
    const user = this.configService.get('RABBITMQ_USER');
    const password = this.configService.get('RABBITMQ_PASSWORD');
    const host = this.configService.get('RABBITMQ_HOST');
    const port = this.configService.get('RABBITMQ_PORT');
    const queue = this.configService.get('RABBITMQ_QUEUE_NAME');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}:${port}`],
        queue,
      },
    };
  }
}
