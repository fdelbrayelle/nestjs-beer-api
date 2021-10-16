import { Injectable } from '@nestjs/common';
import { EMPTY, from, Observable, of } from 'rxjs';
import { Beer } from './beer.interface';

@Injectable()
export class BeerService {
  private beers: Beer[] = [
    {
      id: 1,
      name: 'Chimay',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Orval',
      createdAt: new Date(),
    },
  ];

  findAll(keyword?: string): Observable<Beer> {
    if (keyword) {
      return from(this.beers.filter((beer) => beer.name.indexOf(keyword) >= 0));
    }

    return from(this.beers);
  }

  findById(id: number): Observable<Beer> {
    const found = this.beers.find((beer) => beer.id === id);
    if (found) {
      return of(found);
    }
    return EMPTY;
  }

  save(data: Beer): Observable<Beer> {
    const beer = { ...data, id: this.beers.length + 1, createdAt: new Date() };
    this.beers = [...this.beers, beer];
    return from(this.beers);
  }

  update(id: number, data: Beer): Observable<Beer> {
    this.beers = this.beers.map((beer) => {
      if (id === beer.id) {
        beer.name = data.name;
        beer.updatedAt = new Date();
      }
      return beer;
    });
    return from(this.beers);
  }

  deleteById(id: number): Observable<boolean> {
    const idx: number = this.beers.findIndex((beer) => beer.id === id);
    if (idx >= 0) {
      this.beers = [...this.beers.slice(0, idx), ...this.beers.slice(idx + 1)];
      return of(true);
    }
    return of(false);
  }
}
