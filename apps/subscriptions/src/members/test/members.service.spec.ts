import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';

import { Member } from '../schema';
import { MembersService } from '../members.service';
import {
  memberExisting,
  createMemberMember,
  updateMemberMember,
  createMemberMap,
  updateMemberMap,
} from './stubs/member.stub';

import { MembersRepository } from '../members.repository';
jest.mock('../members.repository');

describe('MembersService', () => {
  let service: MembersService;

  describe('find operations', () => {
    let repository: MembersRepository;
    let id: string;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [MembersService, MembersRepository],
      }).compile();

      service = moduleRef.get<MembersService>(MembersService);
      repository = moduleRef.get<MembersRepository>(MembersRepository);

      id = memberExisting().id;

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when record exists', () => {
        let member: Member;
        let memberFilterQuery: FilterQuery<Member>;

        beforeEach(async () => {
          jest.spyOn(repository, 'findOne');
          member = await service.findOne(id);
          memberFilterQuery = {
            id,
          };
        });

        test('then it should call the repository', () => {
          expect(repository.findOne).toHaveBeenCalledWith(memberFilterQuery);
        });

        test('then it should return a member', () => {
          expect(member).toEqual(memberExisting());
        });
      });
      describe('when NO record exists', () => {
        let member;

        test('then it should return NULL', async () => {
          member = await service.findOne('not-a-real-member');
          expect(member).toBeNull();
        });
      });
    });
    describe('find', () => {
      describe('when records exist', () => {
        let members: Member[];
        let memberFilterQuery: FilterQuery<Member>;

        beforeEach(async () => {
          jest.spyOn(repository, 'find');
          memberFilterQuery = {};
          members = await service.find();
        });

        test('then it should call the repository', () => {
          expect(repository.find).toHaveBeenCalledWith(memberFilterQuery);
        });

        test('then it should return an array of ALL the members', () => {
          expect(members).toEqual([memberExisting()]);
        });
      });
      describe('when NO records exist', () => {
        test.todo('then it should return an empty array');
      });
    });
  });
  describe('save operations', () => {
    let repository: MembersRepository;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [MembersService, MembersRepository],
      }).compile();

      service = module.get<MembersService>(MembersService);
      repository = module.get<MembersRepository>(MembersRepository);

      jest.clearAllMocks();
    });

    describe('create', () => {
      describe('when create is successful', () => {
        let saveSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(service, 'save');
          await service.create(createMemberMap());
        });

        test('then it should call the save function with a Member', () => {
          expect(saveSpy).toHaveBeenCalledWith(createMemberMember());
        });
      });
    });

    describe('update', () => {
      describe('when update is successful', () => {
        let saveSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(service, 'save');
          await service.update(memberExisting(), updateMemberMap());
        });

        test('then it should call the save function with a Member, not a map', () => {
          expect(saveSpy).toHaveBeenCalledWith(updateMemberMember());
        });
      });
    });

    describe('save', () => {
      describe('when save is successful', () => {
        let member: Member;

        beforeEach(async () => {
          member = await service.save(updateMemberMember());
        });

        test('then it should call the repository', () => {
          expect(repository.save).toHaveBeenCalledWith(updateMemberMember());
        });

        test('then it should return the newly created member', () => {
          expect(member).toEqual(updateMemberMember());
        });
      });
    });
  });
});
