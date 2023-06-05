import { Module } from '@nestjs/common';
import { MomentAttachmentService } from './moment-attachment.service';
import { MomentAttachmentController } from './moment-attachment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moment } from '../moment/entities/moment.entity';
import { MomentImage } from './entities/moment-image.entity';
import { S3Service } from '../common/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Moment, MomentImage])],
  controllers: [MomentAttachmentController],
  providers: [MomentAttachmentService, S3Service],
})
export class MomentAttachmentModule {}
