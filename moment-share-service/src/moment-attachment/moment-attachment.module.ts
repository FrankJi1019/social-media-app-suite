import { Module } from '@nestjs/common';
import { MomentAttachmentService } from './moment-attachment.service';
import { MomentAttachmentController } from './moment-attachment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moment } from '../moment/entities/moment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Moment])],
  controllers: [MomentAttachmentController],
  providers: [MomentAttachmentService],
})
export class MomentAttachmentModule {}
