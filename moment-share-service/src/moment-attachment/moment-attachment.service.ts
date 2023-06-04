import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Moment } from '../moment/entities/moment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Service } from '../common/s3.service';
import { MomentImage } from './entities/moment-image.entity';

@Injectable()
export class MomentAttachmentService extends BaseService<MomentImage> {
  static MomentImageS3Key(id: string | number, order: string | number) {
    return `moments/${id}/${order}`;
  }

  constructor(
    @InjectRepository(MomentImage)
    private readonly repository: Repository<MomentImage>,
    @InjectRepository(Moment)
    private readonly momentRepository: Repository<Moment>,
    private readonly s3Service: S3Service,
  ) {
    super(repository);
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
    const moment = await this.momentRepository.findOne({
      where: { id: Number(momentId) },
    });
    if (!moment) {
      throw new NotFoundException('Invalid moment id');
    }
    if (
      !(await this.findOne({
        where: { order: Number(order), moment: { id: Number(momentId) } },
      }))
    ) {
      await this.create({ moment, order: Number(order) });
    }
    return await this.s3Service.uploadObject(
      MomentAttachmentService.MomentImageS3Key(momentId, order),
      file,
    );
  }
}
