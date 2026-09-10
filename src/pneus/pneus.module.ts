import { Module } from '@nestjs/common';
import { PneusService } from './pneus.service';
// import { PneusController } from './pneus.controller';

@Module({
  providers: [PneusService],
  exports: [PneusService]
})
export class PneusModule {}
