import { Test, TestingModule } from '@nestjs/testing';

import { TiersController } from '../tiers.controller';
import {
  tierExisting,
  createTierDto,
  updateTierDto,
  createTierMap,
  updateTierMap,
} from './stubs/tier.stub';
import { Tier } from '../schema';

import { TiersService } from '../tiers.service';
jest.mock('../tiers.service');

describe('TiersController', () => {
  let controller: TiersController;
  let service: TiersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TiersController],
      providers: [TiersService],
    }).compile();

    controller = moduleRef.get<TiersController>(TiersController);
    service = moduleRef.get<TiersService>(TiersService);
    jest.clearAllMocks();
  });

  describe('getOne', () => {
    describe('when a record that exists is requested', () => {
      let label: string;
      let tier: Tier;

      beforeEach(async () => {
        label = tierExisting().label;
        tier = await controller.getOne(label);
      });

      test('then it should call service', () => {
        expect(service.findOne).toBeCalledWith(label);
      });

      test('then it should return a Tier', () => {
        expect(tier).toEqual(tierExisting());
      });
    });
    describe('when a record that does NOT EXIST is requested', () => {
      test.todo('then it should return a 404');
      // test('then it should return a 404', async (done) => {
      // try {
      // await controller.getOne('not-a-real-tier');
      // } catch (err) {
      // if (err.status === '404') {
      // done();
      // }
      // }
      // });
    });
  });

  describe('get', () => {
    describe('when records exist', () => {
      let tiers: Tier[];

      beforeEach(async () => {
        tiers = await controller.get();
      });

      test('then it should call service', () => {
        expect(service.find).toHaveBeenCalled();
      });

      test('then it should return an array of Tiers', () => {
        expect(tiers).toEqual([tierExisting()]);
      });
    });
  });

  describe('create', () => {
    describe('when all fields are valid', () => {
      let tier: Tier;

      beforeEach(async () => {
        tier = await controller.create(createTierDto());
      });

      test('then it should call service', () => {
        expect(service.create).toHaveBeenCalledWith(createTierMap());
      });

      test('then it should return a Tier', () => {
        expect(tier).toEqual(tierExisting());
      });
    });
  });
  describe('update', () => {
    describe('when all fields are valid', () => {
      let tier: Tier;

      beforeEach(async () => {
        tier = await controller.update(tierExisting().label, updateTierDto());
      });

      test('then it should call service', () => {
        expect(service.update).toHaveBeenCalledWith(
          tierExisting(),
          updateTierMap(),
        );
      });

      test('then it should return a Tier', () => {
        expect(tier).toEqual(tierExisting());
      });
    });
  });
});
