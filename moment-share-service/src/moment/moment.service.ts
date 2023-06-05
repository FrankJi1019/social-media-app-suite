import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, QueryFailedError, Repository } from 'typeorm';
import { Moment } from './entities/moment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base/base.service';
import { CreateMomentInput } from './dto/create-moment.input';
import { Character } from '../character/entities/character.entity';
import { Like } from './entities/like.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Account } from '../account/entities/account.entity';
import { MomentAttachmentService } from '../moment-attachment/moment-attachment.service';

@Injectable()
export class MomentService extends BaseService<Moment> {
  constructor(
    private readonly momentAttachmentService: MomentAttachmentService,
    @InjectRepository(Moment)
    private readonly momentRepository: Repository<Moment>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {
    super(momentRepository);
  }

  async createMoment(createMomentInput: CreateMomentInput) {
    const character = await this.characterRepository.findOne({
      where: { name: createMomentInput.character },
    });
    if (!character) {
      throw new NotFoundException('Invalid character name');
    }
    const account = await this.accountRepository.findOne({
      where: { username: createMomentInput.username },
    });
    for (const tag of createMomentInput.tags) {
      if (!(await this.tagRepository.exist({ where: { name: tag } }))) {
        const newTag = this.tagRepository.create({ name: tag });
        await newTag.save();
      }
    }
    const tagEntities = await this.tagRepository.find({
      where: {
        name: In(createMomentInput.tags),
      },
    });
    const entity = await super.create({
      ...createMomentInput,
      character,
      tags: tagEntities,
      account,
    });
    await entity.save();
    return entity;
  }

  async findCharacterByMomentId(id: number): Promise<string> {
    const moment = await super.findById(id);
    return moment.character.name;
  }

  async findLikeNumberByMomentId(id: number): Promise<number> {
    const likes = await this.likeRepository.find({
      where: {
        moment: { id },
      },
    });
    return likes.length;
  }

  async findCommentNumberByMomentId(id: number): Promise<number> {
    const commentNum = await this.commentRepository.find({
      where: {
        moment: { id },
      },
    });
    return commentNum.length;
  }

  async likeMoment(momentId: number, username: string) {
    try {
      const account = await this.accountRepository.findOne({
        where: { username },
      });
      const likeEntity = await this.likeRepository.create({ account });
      const moment = await this.findById(momentId);
      likeEntity.moment = moment;
      await likeEntity.save();
      return moment;
    } catch (e: any) {
      if (e instanceof QueryFailedError) {
        throw new BadRequestException();
      } else {
        throw e;
      }
    }
  }

  async unlikeMoment(momentId: number, username: string) {
    const moment = await this.findById(momentId);
    const likeEntity = await this.likeRepository.findOne({
      where: {
        account: { username },
        moment: { id: momentId },
      },
    });
    if (!likeEntity) {
      throw new NotFoundException();
    }
    await likeEntity.remove();
    return moment;
  }

  async isLikedByUser(username: string, momentId: number) {
    return await this.likeRepository.exist({
      where: {
        account: { username },
        moment: { id: momentId },
      },
    });
  }

  async findAllComments(id: number) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.moment', 'moment')
      .where('moment.id = :id', { id })
      .select(['comment'])
      .orderBy('comment.createdAt', 'DESC')
      .getMany();
  }

  async findMomentTags(id: number) {
    const moment = await this.momentRepository.findOne({
      where: { id },
      relations: { tags: true },
    });
    if (!moment) {
      throw new NotFoundException();
    }
    return moment.tags;
  }

  async findAllMoments(category?: string, followedBy?: string) {
    if (!category && !followedBy) {
      return await super.findAll({ order: { createdAt: 'DESC' } });
    } else if (category) {
      return await this.momentRepository
        .createQueryBuilder('moment')
        .innerJoinAndSelect('moment.tags', 'tag')
        .innerJoinAndSelect('tag.category', 'category')
        .where('category.name = :name', { name: category })
        .orderBy('moment.createdAt', 'DESC')
        .getMany();
    } else {
      return await super.findAll({
        where: [
          { likes: { account: { username: followedBy } } },
          { comments: { account: { username: followedBy } } },
        ],
        order: {
          createdAt: 'DESC',
        },
      });
    }
  }

  async findAccount(id: number) {
    return (
      await super.findOne({ where: { id }, relations: { account: true } })
    ).account;
  }

  async findAllImages(id: number) {
    return await this.momentAttachmentService.getMomentImageUrls(id.toString());
  }
}
