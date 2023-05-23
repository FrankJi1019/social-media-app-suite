import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super(accountRepository);
  }

  async findAllFriends(username: string) {
    return (
      await this.findOne({
        where: { username },
        relations: { friends: true },
      })
    ).friends;
  }
}
