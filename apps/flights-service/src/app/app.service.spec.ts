import { Test } from '@nestjs/testing';

import { MockDataService } from './mock-data.service';

describe('AppService', () => {
  let service: MockDataService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [MockDataService],
    }).compile();

    service = app.get<MockDataService>(MockDataService);
  });

  describe('getData', () => {
    it('should return "Welcome to flights-service!"', () => {
      expect(service.getData()).toEqual({
        message: 'Welcome to flights-service!',
      });
    });
  });

});
