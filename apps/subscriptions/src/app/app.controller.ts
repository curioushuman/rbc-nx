import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Application Support')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiOkResponse({ type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}
