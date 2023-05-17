import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Friend } from './entities/friend.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFriendInput } from './dto/create-friend.input';
import { Account } from '../account/entities/account.entity';
import { Character } from '../character/entities/character.entity';

@Injectable()
export class FriendService extends BaseService<Friend> {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {
    super(friendRepository);
  }

  async createFriendship({
    account1Username,
    account1Character,
    account2Username,
    account2Character,
  }: CreateFriendInput) {
    const account1FindPromise = this.accountRepository.findOne({
      where: { username: account1Username },
    });
    const character1FindPromise = this.characterRepository.findOne({
      where: { name: account1Character },
    });
    const account2FindPromise = this.accountRepository.findOne({
      where: { username: account2Username },
    });
    const character2FindPromise = this.characterRepository.findOne({
      where: { name: account2Character },
    });
    const res = await Promise.all([
      account1FindPromise,
      character1FindPromise,
      account2FindPromise,
      character2FindPromise,
    ]);
    const nullIndex = res.findIndex((entity) => !entity);
    if (nullIndex !== -1) {
      const nullEntity = [
        account1Username,
        account1Character,
        account2Username,
        account2Character,
      ][nullIndex];
      throw new NotFoundException(`Entity not found: ${nullEntity}`);
    }
    const [account1, character1, account2, character2] = res;
    try {
      await this.create({
        userAccount: account1,
        userCharacter: character1,
        friendAccount: account2,
        friendCharacter: character2,
      });
      await this.create({
        userAccount: account2,
        userCharacter: character2,
        friendAccount: account1,
        friendCharacter: character1,
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
