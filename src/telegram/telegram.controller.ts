import { Controller, Get, Req, All } from '@nestjs/common';
import { Request } from 'express';

@Controller('telegram')
export class TelegramController {
  @All('schedule')
  getSchedule(@Req() request: Request) {
    console.log(request);
  }
}
