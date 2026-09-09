import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHealth(): object {
    return {
      status: "ok",
      message: 'API rodando com sucesso!',
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    };
  }
}
