import { Test } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to flights-api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to flights-api!' });
    });
  });
});
