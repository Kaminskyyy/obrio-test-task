import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PushNotificationService {
  private readonly pushNotificationUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.pushNotificationUrl = this.configService.get<string>(
      'PUSH_NOTIFICATION_URL',
    );
  }

  async sendNewUserNotification(user: UserDto) {
    await firstValueFrom(
      this.httpService
        .post(this.pushNotificationUrl, {
          message: this.getGreatingsMessage(user.firstName),
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw error;
          }),
        ),
    );
  }

  private getGreatingsMessage(userFirstName: string): string {
    return `Hello, ${userFirstName}!\nWelcome to our service!`;
  }
}
