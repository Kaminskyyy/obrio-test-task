import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import {
  RABBITMQ_CONFIG_NAME,
  RabbitMQConfig,
} from 'src/config/rabbitmq.config';

@Injectable()
export class RabbitMQConfigService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(): ClientOptions {
    const { url, queue } =
      this.configService.get<RabbitMQConfig>(RABBITMQ_CONFIG_NAME);

    return {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }
}
