import { Module } from '@nestjs/common';
import { InfoController } from './info.contoller';
import { InfoService } from './info.service';

@Module({
  providers: [InfoController, InfoService],
})
export class InfoModule {}
