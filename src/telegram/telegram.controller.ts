import { Controller, Get, Req, All } from '@nestjs/common';
import { Request } from 'express';

@Controller('xxx')
export class TelegramController {
  @All('/schedule')
  getSchedule(@Req() request: Request) {
// tslint:disable-next-line: no-console
    console.log(request.body);
  }
}
