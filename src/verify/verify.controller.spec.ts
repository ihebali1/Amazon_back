import { Test, TestingModule } from '@nestjs/testing';
import { VerifyService } from './services/verify.service';
import { VerifyController } from './verify.controller';

describe('VerifyController', () => {
  let controller: VerifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifyController],
      providers: [VerifyService],
    }).compile();

    controller = module.get<VerifyController>(VerifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
