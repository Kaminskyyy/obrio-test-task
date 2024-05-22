import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userTypeORMRepo: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userTypeORMRepo.create(userDto);
    await this.userTypeORMRepo.insert(user);

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userTypeORMRepo.findOne({ where: { email } });
  }
}
