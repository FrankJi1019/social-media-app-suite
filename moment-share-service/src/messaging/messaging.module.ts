import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingGateway } from './messaging.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../chat/entities/chat.entity';
import { Account } from '../account/entities/account.entity';
import { Friend } from '../friend/entities/friend.entity';
import { Character } from '../character/entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Account, Friend, Character])],
  providers: [MessagingGateway, MessagingService],
})
export class MessagingModule {}
