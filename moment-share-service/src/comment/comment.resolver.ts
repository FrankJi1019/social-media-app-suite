import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../guards/graphql-jwt.guard';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

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
}
