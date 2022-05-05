import { Module } from '@nestjs/common';
import { ApiModule } from '../../shared/api';
import { DbModule } from '../../shared/db';
import { InfoController } from './info.contoller';
import { InfoService } from './info.service';

@Module({
  imports: [ApiModule, DbModule],

  providers: [InfoController, InfoService],
})
export class InfoModule {}
