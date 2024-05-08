import { Test, TestingModule } from '@nestjs/testing';
import { VerificationVendorService } from './verification-vendor.service';

describe('VerificationVendorService', () => {
  let service: VerificationVendorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationVendorService],
    }).compile();

    service = module.get<VerificationVendorService>(VerificationVendorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
