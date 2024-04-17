import { Test, TestingModule } from '@nestjs/testing';
import { PetsManagementService } from './pets-management.service';

describe('PetsManagementService', () => {
  let service: PetsManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsManagementService],
    }).compile();

    service = module.get<PetsManagementService>(PetsManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
