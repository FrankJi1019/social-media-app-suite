import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moment } from '../moment/entities/moment.entity';
import { Character } from '../character/entities/character.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { Account } from '../account/entities/account.entity';

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Moment)
    private readonly momentRepository: Repository<Moment>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super(commentRepository);
  }

  async findCharacter(id: string) {
    const comment = await this.findById(id);
    return comment.character;
  }

  async findMoment(id: string) {
    const comment = await this.findById(id, { relations: { moment: true } });
    return comment.moment;
  }

  async createComment(createCommentInput: CreateCommentInput) {
    const characterEntity = await this.characterRepository.findOne({
      where: { name: createCommentInput.character },
    });
    if (!characterEntity) {
      throw new NotFoundException('Invalid character name');
    }
    const accountEntity = await this.accountRepository.findOne({
      where: { username: createCommentInput.username },
    });
    if (!accountEntity) {
      throw new NotFoundException('Invalid account username');
    }
    const momentEntity = await this.momentRepository.findOne({
      where: { id: Number(createCommentInput.momentId) },
    });
    if (!momentEntity) {
      throw new NotFoundException('Moment does not exist');
    }
    return await super.create({
      account: accountEntity,
      content: createCommentInput.content,
      character: characterEntity,
      moment: momentEntity,
    });
  }

  async findAccount(id: number) {
    return (
      await this.findOne({
        where: { id },
        relations: { account: true },
      })
    ).account;
  }
}
