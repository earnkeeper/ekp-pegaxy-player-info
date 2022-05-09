import { Module } from '@nestjs/common';
import { DbModule } from '../db';
import { ApiService } from './api.service';

@Module({
  providers: [ApiService],
  imports: [DbModule],
  exports: [ApiService],
})
export class ApiModule {}
