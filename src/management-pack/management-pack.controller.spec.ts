import { Test, TestingModule } from '@nestjs/testing';
import { ManagementPackController } from './management-pack.controller';
import { ManagementPackService } from './management-pack.service';

describe('ManagementPackController', () => {
  let controller: ManagementPackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagementPackController],
      providers: [ManagementPackService],
    }).compile();

    controller = module.get<ManagementPackController>(ManagementPackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
