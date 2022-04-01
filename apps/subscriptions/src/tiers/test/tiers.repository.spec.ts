import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { Tier } from '../schema';
import { TiersRepository } from '../tiers.repository';
import { tierExisting } from './stubs/tier.stub';
import { TierMockModel } from './support/tier.model';

describe('TiersRepository', () => {
  let repository: TiersRepository;

  describe('find operations', () => {
    let mockModel: TierMockModel;
    let filterQuery: FilterQuery<Tier>;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          TiersRepository,
          {
            provide: getModelToken(Tier.name),
            useClass: TierMockModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<TiersRepository>(TiersRepository);
      mockModel = moduleRef.get<TierMockModel>(getModelToken(Tier.name));

      filterQuery = {
        label: tierExisting().label,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when record exists', () => {
        let tier: Tier;

        beforeEach(async () => {
          jest.spyOn(mockModel, 'findOne');
          tier = await repository.findOne(filterQuery);
        });

        test('then it should call the mockModel', () => {
          expect(mockModel.findOne).toHaveBeenCalledWith(filterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return a tier', () => {
          expect(tier).toEqual(tierExisting());
        });
      });
    });

    describe('find', () => {
      describe('when records exist', () => {
        let tiers: Tier[];

        beforeEach(async () => {
          jest.spyOn(mockModel, 'find');
          tiers = await repository.find(filterQuery);
        });

        test('then it should call the mockModel', () => {
          expect(mockModel.find).toHaveBeenCalledWith(filterQuery);
        });

        test('then it should return an array of tiers', () => {
          expect(tiers).toEqual([tierExisting()]);
        });
      });
    });
  });
  describe('save operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          TiersRepository,
          {
            provide: getModelToken(Tier.name),
            useValue: TierMockModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<TiersRepository>(TiersRepository);
    });

    describe('save', () => {
      describe('when save is successful', () => {
        let tier: Tier;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(TierMockModel.prototype, 'save');
          constructorSpy = jest.spyOn(
            TierMockModel.prototype,
            'constructorSpy',
          );
          tier = await repository.save(tierExisting());
        });

        test('then it should call the tierModel', () => {
          expect(constructorSpy).toHaveBeenCalledWith(tierExisting());
          expect(saveSpy).toHaveBeenCalled();
        });

        test('then it should return a tier', () => {
          expect(tier).toEqual(tierExisting());
        });
      });
      describe('when save fails', () => {
        test('then it should throw an error', async () => {
          const saveSpy = jest
            .spyOn(TierMockModel.prototype, 'save')
            .mockImplementation(() => {
              throw new Error('Tier error');
            });
          try {
            await repository.save(tierExisting());
          } catch (error) {
            expect(saveSpy).toHaveBeenCalled();
            expect(error).toBeDefined();
          }
        });
      });
    });
  });
});
