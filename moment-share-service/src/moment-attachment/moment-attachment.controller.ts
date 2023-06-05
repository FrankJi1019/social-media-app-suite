import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MomentAttachmentService } from './moment-attachment.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Moments')
@Controller('moments')
export class MomentAttachmentController {
  constructor(
    private readonly momentAttachmentService: MomentAttachmentService,
  ) {}

  @ApiOperation({ deprecated: true })
  @Get(':id/images')
  async getMomentImages(
    @Param('id') momentId: string,
    @Param('order') order: string,
  ) {
    return await this.momentAttachmentService.getObjectSignedUrl(
      momentId,
      order,
    );
  }

  @ApiOperation({ deprecated: true })
  @Get(':id/images/:order')
  async getImage(@Param('id') momentId: string, @Param('order') order: string) {
    return await this.momentAttachmentService.getObjectSignedUrl(
      momentId,
      order,
    );
  }

  @Get('profile-images')
  async getProfiles() {
    return await this.momentAttachmentService.getProfileImages();
  }

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
  @Post(':id/images/:order')
  @UseInterceptors(FileInterceptor('file'))
  async findAll(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') momentId: string,
    @Param('order') imageOrder: string,
  ) {
    return await this.momentAttachmentService.uploadObject(
      momentId,
      imageOrder,
      file,
    );
  }
}
