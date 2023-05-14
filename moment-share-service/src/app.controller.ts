import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestJwtGuard } from './guards/rest-jwt.guard';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiResponse({ status: 200, type: String })
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiResponse({ status: 200, type: String })
  @ApiResponse({ status: 401 })
  @ApiBearerAuth()
  @UseGuards(RestJwtGuard)
  @Get('secure-message')
  getSecureMessage(): string {
    return this.appService.getSecureMessage();
  }
}
