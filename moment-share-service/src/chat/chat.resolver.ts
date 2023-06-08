import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { CreateChatMessageInput } from './dto/create-chat.dto';
import { FetchChatHistoryInput } from './dto/fetch-chat.dto';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtGuard } from '../guards/graphql-jwt.guard';

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(GraphqlJwtGuard)
  @Query('chats')
  async getChatHistory(@Args('input') input: FetchChatHistoryInput) {
    return await this.chatService.getChatHistory(input.accountNames);
  }

  @UseGuards(GraphqlJwtGuard)
  @Mutation('createChat')
  async createChatMsg(@Args('input') input: CreateChatMessageInput) {
    return await this.chatService.createChatMsg(
      input.content,
      Number(input.senderId),
      Number(input.receivedId),
    );
  }

  @UseGuards(GraphqlJwtGuard)
  @ResolveField('sender')
  async findSender(@Parent() { id }: { id: number }) {
    return await this.chatService.findSender(id);
  }

  @UseGuards(GraphqlJwtGuard)
  @ResolveField('receiver')
  async findReceiver(@Parent() { id }: { id: number }) {
    return await this.chatService.findReceiver(id);
  }
}
