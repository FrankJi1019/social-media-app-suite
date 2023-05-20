import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Chat } from '../chat/entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class MessagingService extends BaseService<Chat> {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super(chatRepository);
  }

  getGreetingMessage() {
    return 'Hello';
  }

  async handleMessageSent(
    senderUsername: string,
    receiverUsername: string,
    content: string,
  ) {
    const senderPromise = this.accountRepository.findOne({
      where: { username: senderUsername },
    });
    const receiverPromise = this.accountRepository.findOne({
      where: { username: receiverUsername },
    });
    const [sender, receiver] = await Promise.all([
      senderPromise,
      receiverPromise,
    ]);
    const nullName = sender
      ? receiver
        ? null
        : receiverUsername
      : senderUsername;
    if (nullName) {
      throw new NotFoundException(
        `Account with username ${nullName} does not exist`,
      );
    }
    return await this.create({ sender, receiver, content });
  }
}
