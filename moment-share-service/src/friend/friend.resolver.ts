import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FriendService } from './friend.service';
import { FindOrCreateFriendshipDto } from './dto/find-or-create-friendship.dto';

@Resolver('Friendship')
export class FriendResolver {
  constructor(private readonly friendService: FriendService) {}

  @Query('friendship')
  async findOne(@Args('id') id: number) {
    return await this.friendService.findById(id);
  }

  @Mutation('findOrCreateFriendship')
  async findOrCreateFriendship(
    @Args('input') input: FindOrCreateFriendshipDto,
  ) {
    return await this.friendService.findOrCreateFriendship(
      input.userAccountName,
      input.friendAccountName,
    );
  }

  @ResolveField('userAccount')
  async findUserAccount(@Parent() { id }: { id: string }) {
    return (
      await this.friendService.findById(id, {
        relations: {
          userAccount: true,
        },
      })
    ).userAccount;
  }

  @ResolveField('userCharacter')
  async findUserCharacter(@Parent() { id }: { id: string }) {
    return (
      await this.friendService.findById(id, {
        relations: {
          userCharacter: true,
        },
      })
    ).userCharacter;
  }

  @ResolveField('friendAccount')
  async findFriendAccount(@Parent() { id }: { id: string }) {
    return (
      await this.friendService.findById(id, {
        relations: {
          friendAccount: true,
        },
      })
    ).friendAccount;
  }

  @ResolveField('friendCharacter')
  async findFriendCharacter(@Parent() { id }: { id: string }) {
    return (
      await this.friendService.findById(id, {
        relations: {
          friendCharacter: true,
        },
      })
    ).friendCharacter;
  }
}
