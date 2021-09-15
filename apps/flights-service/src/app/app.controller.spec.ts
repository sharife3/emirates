import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { MockDataService } from './mock-data.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [MockDataService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to flights-service!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to flights-service!',
      });
    });
  });
});
