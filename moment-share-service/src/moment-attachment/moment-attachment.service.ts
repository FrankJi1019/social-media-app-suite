import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Moment } from '../moment/entities/moment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from '../common/s3.service';
import { MomentAttachmentController } from './moment-attachment.controller';

@Injectable()
export class MomentAttachmentService extends BaseService<Moment> {
  static MomentImageS3Key(id: string | number, order: string | number) {
    return `moments/${id}/${order}`;
  }

  constructor(
    @InjectRepository(Moment)
    private readonly momentRepository: Repository<Moment>,
    private readonly s3Service: S3Service,
  ) {
    super(momentRepository);
  }

  async getObject(momentId: string, order: string) {
    return await this.s3Service.getObject(
      MomentAttachmentService.MomentImageS3Key(momentId, order),
    );
  }

  async getObjectSignedUrl(momentId: string, order: string) {
    return await this.s3Service.getObjectSignedUrl(
      MomentAttachmentService.MomentImageS3Key(momentId, order),
    );
  }

  async uploadObject(
    momentId: string,
    order: string,
    file: Express.Multer.File,
  ) {
    return await this.s3Service.uploadObject(
      MomentAttachmentService.MomentImageS3Key(momentId, order),
      file,
    );
  }
}
