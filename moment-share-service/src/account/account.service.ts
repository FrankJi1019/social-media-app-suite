import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from '../common/s3.service';
import { pickRandomElement } from '../utils/random';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly s3Service: S3Service,
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

  async createAccount(username: string) {
    const profileImageKeys = await this.s3Service.getFolderObjectKeys(
      'profile-image/default',
    );
    return await super.create({
      username,
      profileS3ObjectKey: pickRandomElement(profileImageKeys),
    });
  }

  async findProfileImage(id: number) {
    return await this.s3Service.getObjectSignedUrl(
      (
        await this.findById(id)
      ).profileS3ObjectKey,
    );
  }
}
