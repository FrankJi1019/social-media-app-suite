import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly bucket: string;
  constructor(
    @InjectAwsService(S3)
    private readonly s3: S3,
  ) {
    this.bucket = process.env.AWS_SE_BUCKET;
  }

  async getObject(key: string) {
    return await this.s3
      .getObject({
        Bucket: this.bucket,
        Key: key,
      })
      .promise();
  }

  async getObjectSignedUrl(key: string) {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: 7 * 24 * 60 * 60,
    });
  }

  async uploadObject(key: string, file: Express.Multer.File) {
    return await this.s3
      .putObject({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
  }

  async getFolderObjectKeys(directory: string) {
    return (
      await this.s3
        .listObjectsV2({ Bucket: this.bucket, Prefix: directory })
        .promise()
    ).Contents.map(({ Key }) => Key);
  }
}
