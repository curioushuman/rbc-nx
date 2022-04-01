import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';

import { Tier } from '../schema';
import { TiersService } from '../tiers.service';
import {
  tierExisting,
  createTierTier,
  updateTierTier,
  createTierMap,
  updateTierMap,
} from './stubs/tier.stub';

import { TiersRepository } from '../tiers.repository';
jest.mock('../tiers.repository');

describe('TiersService', () => {
  let service: TiersService;

  describe('find operations', () => {
    let repository: TiersRepository;
    let label: string;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [TiersService, TiersRepository],
      }).compile();

      service = moduleRef.get<TiersService>(TiersService);
      repository = moduleRef.get<TiersRepository>(TiersRepository);

      label = tierExisting().label;

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when record exists', () => {
        let tier: Tier;
        let tierFilterQuery: FilterQuery<Tier>;

        beforeEach(async () => {
          jest.spyOn(repository, 'findOne');
          tier = await service.findOne(label);
          tierFilterQuery = {
            label,
          };
        });

        test('then it should call the repository', () => {
          expect(repository.findOne).toHaveBeenCalledWith(tierFilterQuery);
        });

        test('then it should return a tier', () => {
          expect(tier).toEqual(tierExisting());
        });
      });
      describe('when NO record exists', () => {
        let tier;

        test('then it should return NULL', async () => {
          tier = await service.findOne('not-a-real-tier');
          expect(tier).toBeNull();
        });
      });
    });
    describe('find', () => {
      describe('when records exist', () => {
        let tiers: Tier[];
        let tierFilterQuery: FilterQuery<Tier>;

        beforeEach(async () => {
          jest.spyOn(repository, 'find');
          tierFilterQuery = {};
          tiers = await service.find();
        });

        test('then it should call the repository', () => {
          expect(repository.find).toHaveBeenCalledWith(tierFilterQuery);
        });

        test('then it should return an array of ALL the tiers', () => {
          expect(tiers).toEqual([tierExisting()]);
        });
      });
      describe('when NO records exist', () => {
        test.todo('then it should return an empty array');
      });
    });
  });
  describe('save operations', () => {
    let repository: TiersRepository;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [TiersService, TiersRepository],
      }).compile();

      service = module.get<TiersService>(TiersService);
      repository = module.get<TiersRepository>(TiersRepository);

      jest.clearAllMocks();
    });

    describe('create', () => {
      describe('when create is successful', () => {
        let saveSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(service, 'save');
          await service.create(createTierMap());
        });

        test('then it should call the save function with a Tier', () => {
          expect(saveSpy).toHaveBeenCalledWith(createTierTier());
        });
      });
    });

    describe('update', () => {
      describe('when update is successful', () => {
        let saveSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(service, 'save');
          await service.update(tierExisting(), updateTierMap());
        });

        test('then it should call the save function with a Tier, not a map', () => {
          expect(saveSpy).toHaveBeenCalledWith(updateTierTier());
        });
      });
    });

    describe('save', () => {
      describe('when save is successful', () => {
        let tier: Tier;

        beforeEach(async () => {
          tier = await service.save(updateTierTier());
        });

        test('then it should call the repository', () => {
          expect(repository.save).toHaveBeenCalledWith(updateTierTier());
        });

        test('then it should return the newly created tier', () => {
          expect(tier).toEqual(updateTierTier());
        });
      });
    });
  });
});
