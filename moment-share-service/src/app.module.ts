import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MomentModule } from './moment/moment.module';
import { graphqlConfigOptions } from './config/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfigOptions } from './config/data-source';
import { CharacterModule } from './character/character.module';
import { AuthzModule } from './authz/authz.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { AccountModule } from './account/account.module';
import { FriendModule } from './friend/friend.module';
import { MessagingModule } from './messaging/messaging.module';
import { ChatModule } from './chat/chat.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    GraphQLModule.forRoot(graphqlConfigOptions),
    TypeOrmModule.forRoot(typeormConfigOptions),
    MomentModule,
    CharacterModule,
    AuthzModule,
    CommentModule,
    CategoryModule,
    TagModule,
    AccountModule,
    FriendModule,
    MessagingModule,
    ChatModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
