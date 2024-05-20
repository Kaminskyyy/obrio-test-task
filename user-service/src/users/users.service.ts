import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly rabbitClient: ClientProxy,
  ) {}

  async createUser(user: CreateUserDto) {
    this.rabbitClient.emit('user-created', user);

    return { message: 'User created!' };
  }
}
