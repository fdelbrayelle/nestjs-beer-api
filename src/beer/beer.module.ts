import { Module } from '@nestjs/common';
import { BeerService } from './beer.service';
import { BeerController } from './beer.controller';

@Module({
  providers: [BeerService],
  controllers: [BeerController],
})
export class BeerModule {}
