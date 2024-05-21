import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';
import { NotificationService } from './notification.service';
import { EventPatternName } from './constants/event-pattern-name.enum';

@Controller()
@UsePipes(new ValidationPipe({ whitelist: true }))
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(EventPatternName.USER_CREATED)
  async handleNewUser(@Payload() user: UserDto) {
    await this.notificationService.scheduleNewUserNotification(user);
  }
}
