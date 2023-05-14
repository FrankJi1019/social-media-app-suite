import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moment } from '../moment/entities/moment.entity';
import { Character } from '../character/entities/character.entity';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentService extends BaseService<Comment> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Moment)
    private readonly momentRepository: Repository<Moment>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
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
    const characterEntity = await this.characterRepository.find({
      where: { name: createCommentInput.character },
    });
    if (characterEntity.length === 0) {
      throw new NotFoundException('Invalid character name');
    }
    const momentEntity = await this.momentRepository.find({
      where: { id: Number(createCommentInput.momentId) },
    });
    if (momentEntity.length === 0) {
      throw new NotFoundException('Moment does not exist');
    }
    return await super.create({
      username: createCommentInput.username,
      content: createCommentInput.content,
      character: characterEntity[0],
      moment: momentEntity[0],
    });
  }
}
