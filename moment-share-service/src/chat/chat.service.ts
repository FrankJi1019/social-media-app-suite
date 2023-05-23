import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class ChatService extends BaseService<Chat> {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super(chatRepository);
  }

  async getChatHistory(accountNames: Array<string>) {
    return await this.chatRepository
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.sender', 's')
      .innerJoinAndSelect('c.receiver', 'r')
      .where('s.username IN (:...accountNames)', { accountNames })
      .andWhere('r.username IN (:...accountNames)', { accountNames })
      .andWhere('s.username != r.username')
      .getMany();
  }

  async createChatMsg(content: string, senderId: number, receiverId: number) {
    if (senderId === receiverId) {
      throw new ForbiddenException('Self-chatting is prohibited');
    }
    const senderPromise = this.accountRepository.findOne({
      where: { id: senderId },
    });
    const receiverPromise = this.accountRepository.findOne({
      where: { id: receiverId },
    });
    const [sender, receiver] = await Promise.all([
      senderPromise,
      receiverPromise,
    ]);
    const nullId = sender ? (receiver ? -1 : receiverId) : senderId;
    if (nullId !== -1) {
      throw new NotFoundException(`Account with id ${nullId} does not exist`);
    }
    return await super.create({
      sender,
      receiver,
      content,
    });
  }

  async findSender(id: number) {
    return (await super.findById(id, { relations: { sender: true } })).sender;
  }

  async findReceiver(id: number) {
    return (await super.findById(id, { relations: { receiver: true } }))
      .receiver;
  }
}
