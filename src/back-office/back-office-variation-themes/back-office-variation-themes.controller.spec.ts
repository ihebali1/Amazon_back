import { Test, TestingModule } from '@nestjs/testing';
import { BackOfficeVariationThemesController } from './back-office-variation-themes.controller';

describe('BackOfficeVariationThemesController', () => {
  let controller: BackOfficeVariationThemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackOfficeVariationThemesController],
    }).compile();

    controller = module.get<BackOfficeVariationThemesController>(
      BackOfficeVariationThemesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
