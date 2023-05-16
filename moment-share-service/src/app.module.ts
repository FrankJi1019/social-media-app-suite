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
import { ChatModule } from './chat/chat.module';

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
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
