import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Observable, take, toArray } from 'rxjs';
import { Beer } from './beer.interface';
import { BeerService } from './beer.service';

@Controller('beers')
export class BeerController {
  constructor(private beerService: BeerService) {}

  @Get('')
  getAllBeers(@Query('q') keyword?: string): Observable<Beer[]> {
    return this.beerService.findAll(keyword).pipe(take(10), toArray());
  }

  @Get(':id')
  getBeerById(@Param('id', ParseIntPipe) id: number): Observable<Beer> {
    return this.beerService.findById(id);
  }

  @Post('')
  createBeer(@Body() beer: Beer): Observable<Beer[]> {
    return this.beerService.save(beer).pipe(toArray());
  }

  @Put(':id')
  updateBeer(
    @Param('id', ParseIntPipe) id: number,
    @Body() beer: Beer,
  ): Observable<Beer[]> {
    return this.beerService.update(id, beer).pipe(toArray());
  }

  @Delete(':id')
  deleteBeerById(@Param('id', ParseIntPipe) id: number): Observable<boolean> {
    return this.beerService.deleteById(id);
  }
}
