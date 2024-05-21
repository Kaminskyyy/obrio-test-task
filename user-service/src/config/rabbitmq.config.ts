export default () => {
  const user = process.env.RABBITMQ_USER || 'admin';
  const password = process.env.RABBITMQ_PASSWORD || 'admin';
  const host = process.env.RABBITMQ_HOST || 'localhost';
  const port = parseInt(process.env.RABBITMQ_PORT) || 5672;
  const queue = process.env.RABBITMQ_QUEUE_NAME || 'new_users_queue';

  return {
    rabbitmq: {
      url: `amqp://${user}:${password}@${host}:${port}`,
      queue,
    },
  };
};
export interface RabbitMQConfig {
  url: string;
  queue: string;
}
