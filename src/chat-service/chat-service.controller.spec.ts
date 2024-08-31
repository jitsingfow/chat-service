import { Test, TestingModule } from '@nestjs/testing';
import { ChatServiceController } from './chat-service.controller';

describe('ChatServiceController', () => {
  let controller: ChatServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatServiceController],
    }).compile();

    controller = module.get<ChatServiceController>(ChatServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
