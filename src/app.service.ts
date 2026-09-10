import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      status: "ok",
      message: 'API rodando com sucesso!',
      timestamp: new Date().toISOString(),
      version: '0.1.0-mvp',
    };
  }
}
