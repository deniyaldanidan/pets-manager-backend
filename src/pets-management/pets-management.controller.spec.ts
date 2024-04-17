import { Test, TestingModule } from '@nestjs/testing';
import { PetsManagementController } from './pets-management.controller';

describe('PetsManagementController', () => {
  let controller: PetsManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsManagementController],
    }).compile();

    controller = module.get<PetsManagementController>(PetsManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
