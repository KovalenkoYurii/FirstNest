import { Controller, Get, All, Req, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/root')
  get(@Req() request: Request) {
// tslint:disable-next-line: no-console
    console.log(request.body);
  }

  @Post('/root')
  post(@Req() request: Request) {
// tslint:disable-next-line: no-console
    console.log(request.body);
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
