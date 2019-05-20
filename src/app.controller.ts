import { Controller, Get, All, Req, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
// tslint:disable-next-line: no-console
    console.dir({ process });
    return this.appService.getHello();
  }

  @Get('/telegram/schedule')
  getSchedule(@Req() request: Request) {
    // tslint:disable-next-line: no-console
    console.log(request.body);
  }

  @Post('/telegram/schedule')
  postSchedule(@Req() request: Request) {
    // tslint:disable-next-line: no-console
    console.log(request.body);
  }
}
