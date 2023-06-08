import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../guards/graphql-jwt.guard';
import { QueryCommentInput } from './dto/query-comment.input';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query('comments')
  async getComments(@Args('input') { momentId }: QueryCommentInput) {
    return await this.commentService.findAll({
      where: {
        moment: { id: Number(momentId) },
      },
    });
  }

  @UseGuards(GraphqlJwtGuard)
  @Mutation('createComment')
  async createComment(@Args('input') input: CreateCommentInput) {
    return await this.commentService.createComment(input);
  }

  @ResolveField('character')
  async findCharacter(@Parent() { id }: { id: string }) {
    return await this.commentService.findCharacter(id);
  }

  @ResolveField('moment')
  async findMoment(@Parent() { id }: { id: string }) {
    return await this.commentService.findMoment(id);
  }

  @ResolveField('account')
  async findAccount(@Parent() { id }: { id: number }) {
    return await this.commentService.findAccount(id);
  }
}
