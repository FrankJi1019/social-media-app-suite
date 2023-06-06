import { Injectable } from '@nestjs/common';
import { S3Service } from '../common/s3.service';

@Injectable()
export class AccountAttachmentService {
  static DefaultProfileImageKey(id) {
    return `profile-image/default/${id}`;
  }

  constructor(private readonly s3Service: S3Service) {}

  async addNewDefaultProfileImage(file: Express.Multer.File, id: string) {
    await this.s3Service.uploadObject(
      AccountAttachmentService.DefaultProfileImageKey(id),
      file,
    );
  }
}
