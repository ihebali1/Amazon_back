import { Test, TestingModule } from '@nestjs/testing';
import { VerificationVendorController } from './verification-vendor.controller';

describe('VerificationVendorController Controller', () => {
  let controller: VerificationVendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerificationVendorController],
    }).compile();

    controller = module.get<VerificationVendorController>(
      VerificationVendorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
