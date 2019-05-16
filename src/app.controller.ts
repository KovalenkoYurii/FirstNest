import { Controller, Get, All, Req } from '@nestjs/common';
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
  get(): string {
    return this.appService.getHello();
  }

  @All('/telegram/schedule')
  getSchedule(@Req() request: Request) {
    console.log(request.body);
  }
}
