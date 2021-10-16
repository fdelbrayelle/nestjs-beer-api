import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeerModule } from './beer/beer.module';

@Module({
  imports: [BeerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
