import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagingService {
  getGreetingMessage() {
    return 'Hello';
  }
}
