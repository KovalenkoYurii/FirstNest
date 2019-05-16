import { Controller, Get, All, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/root')
  get(): string {
    return this.appService.getHello();
  }

  @All('/root')
  getSchedule(@Req() request: Request) {
    console.log(request.body);
  }
}
