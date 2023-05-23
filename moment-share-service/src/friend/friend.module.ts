import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendResolver } from './friend.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { Character } from '../character/entities/character.entity';
import { Account } from '../account/entities/account.entity';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friend, Character, Account]),
    MessagingModule,
  ],
  providers: [FriendResolver, FriendService],
})
export class FriendModule {}
