import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisConfig } from 'src/config/redis.config';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const options = configService.get<RedisConfig>('redis');

        return {
          redis: {
            ...options,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class RedisModule {}
