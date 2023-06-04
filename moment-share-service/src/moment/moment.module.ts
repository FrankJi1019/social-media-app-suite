import { Module } from '@nestjs/common';
import { MomentService } from './moment.service';
import { MomentResolver } from './moment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moment } from './entities/moment.entity';
import { Like } from './entities/like.entity';
import { Character } from '../character/entities/character.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Account } from '../account/entities/account.entity';
import { MomentAttachmentService } from '../moment-attachment/moment-attachment.service';
import { MomentImage } from '../moment-attachment/entities/moment-image.entity';
import { S3Service } from '../common/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Moment,
      Like,
      Character,
      Comment,
      Tag,
      Account,
      MomentImage,
    ]),
  ],
  providers: [
    MomentResolver,
    MomentService,
    MomentAttachmentService,
    S3Service,
  ],
})
export class MomentModule {}
