import { Module } from '@nestjs/common';
import { MomentService } from './moment.service';
import { MomentResolver } from './moment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moment } from './entities/moment.entity';
import { Like } from './entities/like.entity';
import { Character } from '../character/entities/character.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Account } from '../account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Moment, Like, Character, Comment, Tag, Account]),
  ],
  providers: [MomentResolver, MomentService],
})
export class MomentModule {}
