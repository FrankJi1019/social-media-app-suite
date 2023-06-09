import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MomentAttachmentService } from './moment-attachment.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { RestJwtGuard } from '../guards/rest-jwt.guard';

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
  @UseGuards(RestJwtGuard)
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
