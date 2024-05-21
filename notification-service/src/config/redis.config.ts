export default () => {
  return {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
    },
  };
};

export interface RedisConfig {
  host: string;
  port: number;
}
