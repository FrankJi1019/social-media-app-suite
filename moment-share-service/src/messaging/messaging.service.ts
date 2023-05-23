import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Chat } from '../chat/entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { Friend } from '../friend/entities/friend.entity';
import { Character } from '../character/entities/character.entity';
import { pickRandomElement } from '../utils/random';

@Injectable()
export class MessagingService extends BaseService<Chat> {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {
    super(chatRepository);
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
    const friendship = await this.friendRepository.findOne({
      where: {
        userAccount: { username: receiverUsername },
        friendAccount: { username: senderUsername },
      },
    });
    if (!friendship) {
      const characters = await this.characterRepository.find();
      await this.friendRepository
        .create({
          userAccount: receiver,
          friendAccount: sender,
          userCharacter: pickRandomElement(characters),
          friendCharacter: pickRandomElement(characters),
        })
        .save();
    }
    return await this.create({ sender, receiver, content });
  }
}
