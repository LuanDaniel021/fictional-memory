import { Module } from '@nestjs/common';
import { MedicaoPneusService } from './medicao_pneus.service';
import { MedicaoPneusController } from './medicao_pneus.controller';

@Module({
  controllers: [MedicaoPneusController],
  providers: [MedicaoPneusService],
})
export class MedicaoPneusModule {}
