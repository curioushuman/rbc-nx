import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';

import { Member } from '../schema';
import { MembersRepository } from '../members.repository';
import { memberExisting } from './stubs/member.stub';
import { MemberMockModel } from './support/member.model';

describe('MembersRepository', () => {
  let repository: MembersRepository;

  describe('find operations', () => {
    let mockModel: MemberMockModel;
    let filterQuery: FilterQuery<Member>;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          MembersRepository,
          {
            provide: getModelToken(Member.name),
            useClass: MemberMockModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<MembersRepository>(MembersRepository);
      mockModel = moduleRef.get<MemberMockModel>(getModelToken(Member.name));

      filterQuery = {
        id: memberExisting().id,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when record exists', () => {
        let member: Member;

        beforeEach(async () => {
          jest.spyOn(mockModel, 'findOne');
          member = await repository.findOne(filterQuery);
        });

        test('then it should call the mockModel', () => {
          expect(mockModel.findOne).toHaveBeenCalledWith(filterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return a member', () => {
          expect(member).toEqual(memberExisting());
        });
      });
    });

    describe('find', () => {
      describe('when records exist', () => {
        let members: Member[];

        beforeEach(async () => {
          jest.spyOn(mockModel, 'find');
          members = await repository.find(filterQuery);
        });

        test('then it should call the mockModel', () => {
          expect(mockModel.find).toHaveBeenCalledWith(filterQuery);
        });

        test('then it should return an array of members', () => {
          expect(members).toEqual([memberExisting()]);
        });
      });
    });
  });
  describe('save operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          MembersRepository,
          {
            provide: getModelToken(Member.name),
            useValue: MemberMockModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<MembersRepository>(MembersRepository);
    });

    describe('save', () => {
      describe('when save is successful', () => {
        let member: Member;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(MemberMockModel.prototype, 'save');
          constructorSpy = jest.spyOn(
            MemberMockModel.prototype,
            'constructorSpy',
          );
          member = await repository.save(memberExisting());
        });

        test('then it should call the memberModel', () => {
          expect(constructorSpy).toHaveBeenCalledWith(memberExisting());
          expect(saveSpy).toHaveBeenCalled();
        });

        test('then it should return a member', () => {
          expect(member).toEqual(memberExisting());
        });
      });
      describe('when save fails', () => {
        test('then it should throw an error', async () => {
          const saveSpy = jest
            .spyOn(MemberMockModel.prototype, 'save')
            .mockImplementation(() => {
              throw new Error('Member error');
            });
          try {
            await repository.save(memberExisting());
          } catch (error) {
            expect(saveSpy).toHaveBeenCalled();
            expect(error).toBeDefined();
          }
        });
      });
    });
  });
});
