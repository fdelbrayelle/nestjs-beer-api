import { Test, TestingModule } from '@nestjs/testing';
import { take, toArray } from 'rxjs';
import { BeerService } from './beer.service';

describe('BeerService', () => {
  let service: BeerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeerService],
    }).compile();

    service = module.get<BeerService>(BeerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return 2 beers', (done) => {
    service
      .findAll()
      .pipe(take(2), toArray())
      .subscribe({
        next: (data) => expect(data.length).toBe(2),
        error: (error) => console.log(error),
        complete: done(),
      });
  });

  it('findAll with keyword should return 1 beer', (done) => {
    service
      .findAll('Chimay')
      .pipe(take(2), toArray())
      .subscribe({
        next: (data) => expect(data.length).toBe(1),
        error: (error) => console.log(error),
        complete: done(),
      });
  });

  it('findById with existing id should return 1 beer', (done) => {
    service.findById(1).subscribe({
      next: (data) => {
        expect(data.id).toBe(1);
        expect(data.name).toEqual('Chimay');
      },
      error: (error) => console.log(error),
      complete: done(),
    });
  });

  it('findById with none existing id should return empty', (done) => {
    service
      .findById(10001)
      .pipe(toArray())
      .subscribe({
        next: (data) => expect(data.length).toBe(0),
        error: (error) => console.log(error),
        complete: done(),
      });
  });

  it('save should increase the length of beers', (done) => {
    service
      .save({
        id: 4,
        name: 'test name',
      })
      .pipe(toArray())
      .subscribe({
        next: (data) => {
          expect(data.length).toBe(3);
          expect(data[2].createdAt).toBeTruthy();
        },
        error: (error) => console.log(error),
        complete: done(),
      });
  });

  it('update should change the content of beer', (done) => {
    service
      .update(1, {
        id: 1,
        name: 'Chimay bleue',
        createdAt: new Date(),
      })
      .pipe(take(2), toArray())
      .subscribe({
        next: (data) => {
          expect(data.length).toBe(2);
          expect(data[0].name).toBe('Chimay bleue');
          expect(data[0].updatedAt).not.toBeNull();
        },
        error: (error) => console.log(error),
        complete: done(),
      });
  });

  it('deleteById with existing id should return true', (done) => {
    service.deleteById(1).subscribe({
      next: (data) => expect(data).toBeTruthy,
      error: (error) => console.log(error),
      complete: done(),
    });
  });

  it('deleteById with none existing id should return false', (done) => {
    service.deleteById(10001).subscribe({
      next: (data) => expect(data).toBeFalsy,
      error: (error) => console.log(error),
      complete: done(),
    });
  });
});
