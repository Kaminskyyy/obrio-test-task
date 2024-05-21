import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AppService {
  handleNewUser(user: UserDto) {
    console.log(`New user received:`, user);
  }
}
