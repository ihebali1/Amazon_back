import { Test, TestingModule } from '@nestjs/testing';
import { ManagementPackService } from './management-pack.service';

describe('ManagementPackService', () => {
  let service: ManagementPackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagementPackService],
    }).compile();

    service = module.get<ManagementPackService>(ManagementPackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
