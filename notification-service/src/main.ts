import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import rabbitmqConfig from './config/rabbitmq.config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      load: [rabbitmqConfig],
    }),
  );
  const config = appContext.get(ConfigService);

  const { url, queue } = config.get(`rabbitmq`);
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
