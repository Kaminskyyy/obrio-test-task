import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from 'src/rabbitmq/constants/constants';
import { UsersRepository } from './users.repository';
import { UsersEventPatternName } from './constants/users-event-pattern-name.enum';
import { User } from 'src/database/entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly rabbitmqClient: ClientProxy,
    private readonly userRepository: UsersRepository,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneByEmail(
      userDto.email,
    );
    if (existingUser) throw new ConflictException('User already exists');

    const user = await this.userRepository.create(userDto);

    this.rabbitmqClient.emit(UsersEventPatternName.USER_CREATED, user);

    return user;
  }
}
