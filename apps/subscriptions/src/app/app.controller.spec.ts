import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Welcome to auth!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toEqual('Welcome to auth!');
    });
  });
});
