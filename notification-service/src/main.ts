import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import rabbitmqConfig, {
  RABBITMQ_CONFIG_NAME,
  RabbitMQConfig,
} from './config/rabbitmq.config';
import redisConfig from './config/redis.config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      load: [rabbitmqConfig, redisConfig],
    }),
  );
  const config = appContext.get(ConfigService);

  const { url, queue } = config.get<RabbitMQConfig>(RABBITMQ_CONFIG_NAME);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue,
      },
    },
  );

  await app.listen();

  appContext.close();
}
bootstrap();
