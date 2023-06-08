import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AccountAttachmentService } from './account-attachment.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { RestJwtGuard } from '../guards/rest-jwt.guard';

@ApiTags('Accounts')
@Controller('account-attachment')
export class AccountAttachmentController {
  constructor(
    private readonly accountAttachmentService: AccountAttachmentService,
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
  @UseGuards(RestJwtGuard)
  @Post('default/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return await this.accountAttachmentService.addNewDefaultProfileImage(
      file,
      id,
    );
  }
}
