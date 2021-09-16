import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to flights-api!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to flights-api!',
      });
    });
  });
});
