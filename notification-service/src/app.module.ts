import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import redisConfig from './config/redis.config';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [redisConfig] }),
    RedisModule,
    NotificationModule,
  ],
})
export class AppModule {}
