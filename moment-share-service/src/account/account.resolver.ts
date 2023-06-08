import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AccountService } from './account.service';
import { CreateAccountInput } from './dto/create-account.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../guards/graphql-jwt.guard';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(GraphqlJwtGuard)
  @Query('account')
  async findAccount(@Args('username') username: string) {
    return await this.accountService.findOne({ where: { username } });
  }

  @Mutation('createAccount')
  async createAccount(@Args('input') { username }: CreateAccountInput) {
    return await this.accountService.createAccount(username);
  }

  @UseGuards(GraphqlJwtGuard)
  @ResolveField('friends')
  async findFriends(@Parent() { username }: { username: string }) {
    return await this.accountService.findAllFriends(username);
  }

  @UseGuards(GraphqlJwtGuard)
  @ResolveField('profileImage')
  async findProfileImageUrl(@Parent() { id }: { id: number }) {
    return await this.accountService.findProfileImage(id);
  }
}
