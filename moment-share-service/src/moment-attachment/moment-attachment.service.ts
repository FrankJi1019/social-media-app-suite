import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Moment } from '../moment/entities/moment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class MomentAttachmentService extends BaseService<Moment> {
  constructor(
    @InjectRepository(Moment)
    private readonly momentRepository: Repository<Moment>,
    @InjectAwsService(S3)
    private readonly s3: S3,
  ) {
    super(momentRepository);
  }

  async uploadObject(file: Express.Multer.File) {
    return await this.s3
      .putObject({
        Bucket: 'frank-incognitonet',
        Key: 'demo',
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
  }
}
