// import { Test, TestingModule } from '@nestjs/testing';
// import { ScheduleService } from './schedule.service';
// import { HttpService, HttpModule } from '@nestjs/common';

// jest.mock('request-promise');
// describe('ScheduleService', () => {
//   let service: ScheduleService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [HttpModule],
//       providers: [ScheduleService, { provide: HttpService, useValue: {} }],
//     }).compile();

//     service = module.get<ScheduleService>(ScheduleService);
//   });

//   it('should be defined', async done => {
//     expect(service).toBeDefined();
//     done();
//   });
// });
