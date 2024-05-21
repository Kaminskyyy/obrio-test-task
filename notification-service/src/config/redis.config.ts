export const REDIS_CONFIG_NAME = 'redis';

export interface RedisConfig {
  host: string;
  port: number;
}

export default () => {
  return {
    [REDIS_CONFIG_NAME]: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
    },
  };
};
