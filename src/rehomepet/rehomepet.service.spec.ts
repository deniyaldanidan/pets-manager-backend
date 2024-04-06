import { Test, TestingModule } from '@nestjs/testing';
import { RehomepetService } from './rehomepet.service';

describe('RehomepetService', () => {
  let service: RehomepetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RehomepetService],
    }).compile();

    service = module.get<RehomepetService>(RehomepetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
