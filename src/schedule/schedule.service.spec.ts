import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { HttpService, HttpModule } from '@nestjs/common';

jest.mock('request-promise');
describe('ScheduleService', () => {
  // let service: ScheduleService;
  const service: any = {};

  // beforeEach(async () => {});

  it('should be defined', async done => {
    expect(service).toBeDefined();
    done();
  });
});
