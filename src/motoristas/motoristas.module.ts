import { Module } from '@nestjs/common';
import { MotoristasService } from './motoristas.service';
import { MotoristasController } from './motoristas.controller';

@Module({
  controllers: [MotoristasController],
  providers: [MotoristasService],
})
export class MotoristasModule {}
