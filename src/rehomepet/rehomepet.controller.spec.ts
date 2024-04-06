import { Test, TestingModule } from '@nestjs/testing';
import { RehomepetController } from './rehomepet.controller';

describe('RehomepetController', () => {
  let controller: RehomepetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RehomepetController],
    }).compile();

    controller = module.get<RehomepetController>(RehomepetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
