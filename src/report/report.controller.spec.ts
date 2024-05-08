import { Test, TestingModule } from '@nestjs/testing';
import { ReportOrderController } from './controllers/report-order.controller';
import { ReportService } from './services/report.service';

describe('ReportOrderController', () => {
  let controller: ReportOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportOrderController],
      providers: [ReportService],
    }).compile();

    controller = module.get<ReportOrderController>(ReportOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
