import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { jest } from '@jest/globals';
import { SupabaseAuthGuard } from '../supabase/supabase.auth.guard';
import { SupabaseService } from '../supabase/supabase.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            login: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        { provide: SupabaseAuthGuard, useValue: { canActivate: jest.fn() } },
        { provide: SupabaseService, useValue: { getClient: jest.fn() } },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
