import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Character } from '../character/entities/character.entity';
import { Moment } from '../moment/entities/moment.entity';
import { Account } from '../account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Character, Moment, Account])],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
