import { Test, TestingModule } from '@nestjs/testing';
import { CaminhoesService } from './caminhoes.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CrlvService } from '../crlvs/crlvs.service';
import { jest } from '@jest/globals';

describe('CaminhoesService', () => {
  let service: CaminhoesService;
  const crlvService = { create: jest.fn() };
  const supabase = { getClient: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaminhoesService,
        { provide: SupabaseService, useValue: supabase },
        { provide: CrlvService, useValue: crlvService },
      ],
    }).compile();

    service = module.get<CaminhoesService>(CaminhoesService);
  });

  it('cria o caminhão vinculando o CRLV criado', async () => {
    const insert = jest.fn().mockReturnThis();
    const select = jest.fn().mockReturnThis();
    const single = jest.fn().mockResolvedValue({ data: { id: 9 }, error: null });
    const update = jest.fn().mockReturnThis();
    const inFilter = jest.fn().mockResolvedValue({ error: null });
    crlvService.create.mockResolvedValue({ id: 7 });
    supabase.getClient.mockReturnValue({
      from: jest
        .fn()
        .mockImplementationOnce(() => ({ insert, select, single }))
        .mockImplementationOnce(() => ({ update, in: inFilter })),
    });

    await expect(service.create({
      km_atual: 100,
      status: 'Ativo',
      crlv: { placa: 'ABC1D23', chassi: 'CHASSI123' },
      pneus: [1, 2],
    })).resolves.toEqual({ mensagem: 'Caminhao cadastrado com sucesso!' });
    expect(crlvService.create).toHaveBeenCalled();
    expect(insert).toHaveBeenCalledWith({ km_atual: 100, status: 'Ativo', crlv_id: 7 });
    expect(update).toHaveBeenCalledWith({ caminhao_id: 9 });
    expect(inFilter).toHaveBeenCalledWith('id', [1, 2]);
  });

  it('retorna caminhões com CRLV, motorista e pneus', async () => {
    const data = [{ crlv: { placa: 'ABC1D23' }, motorista: { nome: 'Ana' }, pneu: [{ id: 1 }] }];
    const query = {
      select: jest.fn().mockResolvedValue({ data, error: null }),
    };
    supabase.getClient.mockReturnValue({ from: jest.fn().mockReturnValue(query) });

    await expect(service.findAll()).resolves.toMatchObject({ data });
  });
});
