import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';

import { ScheduleService } from '../schedule/schedule.service';
import { TelegramService } from './telegram.service';

jest.mock('jsdom', () => () => ({}));

describe('TelegramService', () => {
  let service: TelegramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: ScheduleService, useValue: {} },
        { provide: HttpService, useValue: {} },
        TelegramService,
      ],
    }).compile();

    service = module.get<TelegramService>(TelegramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
