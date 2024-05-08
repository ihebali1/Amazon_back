import { Test, TestingModule } from '@nestjs/testing';
import { RegisterVendorController } from './register-vendor.controller';

describe('Register Controller', () => {
  let controller: RegisterVendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterVendorController],
    }).compile();

    controller = module.get<RegisterVendorController>(RegisterVendorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
