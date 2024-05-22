
# Notifications App



## Tech Stack

**Microservices:** TypeScript, Node.js, Nest.js, TypeORM, class-tranformer, class-validator, cross-env, axios

**Databases:** PostgreSQL, Redis

**Message broker:** RabbitMQ 

Docker, Docker Compose


## Description

The application is divided into two microservices: user service and notification service. The first one is responsible for working with users (creating a user according to the task), the second one for sending notifications. \
When creating a user, user service sends a message to notification-service using RabbitMQ. Notification service receives a message about the creation of a new user and sends the message to the Redis queue with a delay in the amount of time specified through the environment variable (24 hours according to the task). Upon receiving a message from the Redis queue, the notification service makes a request to a URL that simulates sending a push notification.
\
The environment variable files have been commited to make it easier to run the application. The only necessary change is to change the link to which the push notifications will be sent.


## Installation and run

Clone the project

```bash
  $ git clone https://github.com/Kaminskyyy/obrio-test-task.git
```

Navigate to root folder

```
  $ cd obrio-test-task
```

Specify environment variables. Below you can find list of all needed environment variables.

Run docker compose up

```
  $ docker compose up
```
## Environment Variables

To run this project, you will need to add the following environment variables:

### user-service
| Parameter  | Type     | Description                     |
| :--------  | :------- | :-------------------------      |
|`RABBITMQ_USER`| `string` | **Required**. RabbitMQ user |
|`RABBITMQ_PASSWORD`| `string` | **Required**. RabbitMQ password|
|`RABBITMQ_HOST`| `string` | **Required**. RabbitMQ host|
|`RABBITMQ_PORT`| `number` | **Required**. RabbitMQ port
|`RABBITMQ_QUEUE_NAME`| `string` | **Required**. RabbitMQ queue name|
|`POSTGRES_USER`| `string` | **Required**. Postgres user|
|`POSTGRES_PASSWORD`| `string` | **Required**. Postgres password|
|`POSTGRES_HOST`| `string` | **Required**. Postgres host|
|`POSTGRES_PORT`| `number` | **Required**. Postgres port|
|`POSTGRES_DATABASE_NAME` | `string` | **Required**. Postgres database name|
|`TYPE_ORM_SYNCHRONIZE` | `boolean` | **Required**. Set to true to enable schema sync|
|`APP_PORT` | `number` | **Required**. App port|

### notification-service
| Parameter  | Type     | Description                     |
| :--------  | :------- | :-------------------------      |
|`RABBITMQ_USER`| `string` | **Required**. RabbitMQ user |
|`RABBITMQ_PASSWORD`| `string` | **Required**. RabbitMQ password|
|`RABBITMQ_HOST`| `string` | **Required**. RabbitMQ host|
|`RABBITMQ_PORT`| `number` | **Required**. RabbitMQ port
|`RABBITMQ_QUEUE_NAME`| `string` | **Required**. RabbitMQ queue name|
|`REDIS_HOST`| `string` | **Required**. Redis host|
|`REDIS_PORT`| `number` | **Required**. Redis port|
|`PUSH_NOTIFICATION_URL`| `string` | **Required**. Link to which push notifications will be sent. https://webhook.site/ was used to generate url. Recommended format: https://webhook.site/<some-uuid> |
|`PUSH_NOTIFICATION_DELAY`| `number` | **Required**. Push notification delay in miliseconds|

## API Reference

#### Create user

```http
  POST /users/
```
##### Request:
| Parameter  | Type     | Description                     |
| :--------  | :------- | :-------------------------      |
| `firstName`| `string` | **Required**. User's first name |
| `lastName` | `string` | **Required**. User's last name  |
| `email`    | `string` | **Required**. User's email      |

##### Response:
| Parameter  | Type     | Description                     |
| :--------  | :------- | :-------------------------      |
| `firstName`| `string` | User's first name |
| `lastName` | `string` | User's last name  |
| `email`    | `string` | User's email      |
| `id`    | `number` | User's id      |

