import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MomentAttachmentService } from './moment-attachment.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Moments')
@Controller('moments')
export class MomentAttachmentController {
  constructor(
    private readonly momentAttachmentService: MomentAttachmentService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
      },
    },
  })
  @Post(':id/images')
  @UseInterceptors(FileInterceptor('file'))
  findAll(@UploadedFile() file: Express.Multer.File) {
    return this.momentAttachmentService.uploadObject(file);
  }
}
