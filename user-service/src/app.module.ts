import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database.config';
import rabbitmqConfig from './config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [databaseConfig, rabbitmqConfig],
    }),
    UsersModule,
    RabbitmqModule,
    DatabaseModule,
  ],
})
export class AppModule {}
