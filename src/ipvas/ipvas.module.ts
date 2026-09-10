import { Module } from '@nestjs/common';
import { IpvasService } from './ipvas.service';
import { IpvasController } from './ipvas.controller';

@Module({
  controllers: [IpvasController],
  providers: [IpvasService],
})
export class IpvasModule {}
