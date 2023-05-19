import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingGateway } from './messaging.gateway';

@Module({
  providers: [MessagingGateway, MessagingService]
})
export class MessagingModule {}
