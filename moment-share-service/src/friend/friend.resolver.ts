import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FriendService } from './friend.service';
import { CreateFriendInput } from './dto/create-friend.input';

@Resolver('Friend')
export class FriendResolver {
  constructor(private readonly friendService: FriendService) {}

  @Mutation('createFriendship')
  async createFriendship(@Args('input') input: CreateFriendInput) {
    return await this.friendService.createFriendship(input);
  }
}
