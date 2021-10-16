import { BeerService } from './beer.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BeerController } from './beer.controller';
import { Beer } from './beer.interface';

describe('BeerController', () => {
  let controller: BeerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeerService],
      controllers: [BeerController],
    }).compile();

    controller = module.get<BeerController>(BeerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET on /beers should return all beers', async () => {
    const beers = await controller.getAllBeers().toPromise();
    expect(beers.length).toBe(2);
  });

  it('GET on /beers/1 should return one beer ', (done) => {
    controller.getBeerById(1).subscribe((data) => {
      expect(data.id).toEqual(1);
      done();
    });
  });

  it('POST on /beers should return all beers', async () => {
    const beer: Beer = { id: 4, name: 'Rochefort' };
    const beers = await controller.createBeer(beer).toPromise();
    expect(beers.length).toBe(3);
  });

  it('PUT on /beers/1 should return all beers', (done) => {
    const beer: Beer = { id: 4, name: 'Chimay bleue' };
    controller.updateBeer(1, beer).subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data[0].name).toEqual('Chimay bleue');
      expect(data[0].updatedAt).toBeTruthy();
      done();
    });
  });

  it('DELETE on /beers/1 should return true', (done) => {
    controller.deleteBeerById(1).subscribe((data) => {
      expect(data).toBeTruthy();
      done();
    });
  });

  it('DELETE on /beers/1001 should return false', (done) => {
    controller.deleteBeerById(1001).subscribe((data) => {
      expect(data).toBeFalsy();
      done();
    });
  });
});
