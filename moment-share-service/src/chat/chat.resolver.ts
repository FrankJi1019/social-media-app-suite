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

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query('chats')
  async getChatHistory(@Args('input') input: FetchChatHistoryInput) {
    return await this.chatService.getChatHistory(input.accountNames);
  }

  @Mutation('createChat')
  async createChatMsg(@Args('input') input: CreateChatMessageInput) {
    return await this.chatService.createChatMsg(
      input.content,
      Number(input.senderId),
      Number(input.receivedId),
    );
  }

  @ResolveField('sender')
  async findSender(@Parent() { id }: { id: number }) {
    return await this.chatService.findSender(id);
  }

  @ResolveField('receiver')
  async findReceiver(@Parent() { id }: { id: number }) {
    return await this.chatService.findReceiver(id);
  }
}
