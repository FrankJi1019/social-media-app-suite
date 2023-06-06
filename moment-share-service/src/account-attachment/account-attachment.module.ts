import { Module } from '@nestjs/common';
import { AccountAttachmentService } from './account-attachment.service';
import { AccountAttachmentController } from './account-attachment.controller';
import { S3Service } from '../common/s3.service';

@Module({
  controllers: [AccountAttachmentController],
  providers: [AccountAttachmentService, S3Service],
})
export class AccountAttachmentModule {}
