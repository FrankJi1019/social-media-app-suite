import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MomentService } from './moment.service';
import { CreateMomentInput } from './dto/create-moment.input';
import { LikeAndUnlikeMomentInput } from './dto/like-and-unlike-moment.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../guards/graphql-jwt.guard';
import { FilterMomentInput } from './dto/filter-moment.input';

@Resolver('Moment')
export class MomentResolver {
  constructor(private readonly momentService: MomentService) {}

  @Query('moments')
  async findAll(@Args('input') filterMomentInput: FilterMomentInput) {
    return await this.momentService.findAllMoments(
      filterMomentInput?.category,
      filterMomentInput?.followedBy,
    );
  }

  @Query('moment')
  async findById(@Args('id') id: number) {
    return await this.momentService.findById(id);
  }

  @UseGuards(GraphqlJwtGuard)
  @Mutation('createMoment')
  async create(@Args('input') input: CreateMomentInput) {
    return await this.momentService.createMoment(input);
  }

  @Mutation('deleteMoment')
  async delete(@Args('id') id: number) {
    return await this.momentService.deleteById(id);
  }

  @Mutation('likeMoment')
  async like(@Args('input') { momentId, username }: LikeAndUnlikeMomentInput) {
    return await this.momentService.likeMoment(momentId, username);
  }

  @Mutation('unlikeMoment')
  async unlike(
    @Args('input') { momentId, username }: LikeAndUnlikeMomentInput,
  ) {
    return await this.momentService.unlikeMoment(momentId, username);
  }

  @ResolveField('character')
  async findCharacterName(@Parent() { id }: { id: number }) {
    return this.momentService.findCharacterByMomentId(id);
  }

  @ResolveField('likeNumber')
  async findLikeNumber(@Parent() { id }: { id: number }) {
    return this.momentService.findLikeNumberByMomentId(id);
  }

  @ResolveField('commentNumber')
  async findCommentNumber(@Parent() { id }: { id: number }) {
    return this.momentService.findCommentNumberByMomentId(id);
  }

  @ResolveField('isLiked')
  async isLiked(@Context() context, @Parent() { id }: { id: number }) {
    const user = context.req.user;
    if (user) {
      return await this.momentService.isLikedByUser(user.username, id);
    } else {
      return false;
    }
  }

  @ResolveField('character')
  async findCharacter(@Parent() { id }: { id: number }) {
    return (await this.momentService.findById(id)).character;
  }

  @ResolveField('comments')
  async findAllComments(@Parent() { id }: { id: number }) {
    return await this.momentService.findAllComments(id);
  }

  @ResolveField('tags')
  async findAllTags(@Parent() { id }: { id: number }) {
    return await this.momentService.findMomentTags(id);
  }

  @ResolveField('account')
  async findAccount(@Parent() { id }: { id: number }) {
    return await this.momentService.findAccount(id);
  }
}
