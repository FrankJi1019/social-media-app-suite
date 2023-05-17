import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { CreateAccountInput } from './dto/create-account.input';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query('account')
  async findAccount(@Args('username') username: string) {
    return await this.accountService.findOne({ where: { username } });
  }

  @Mutation('createAccount')
  async createAccount(@Args('input') { username }: CreateAccountInput) {
    return await this.accountService.create({ username });
  }
}
