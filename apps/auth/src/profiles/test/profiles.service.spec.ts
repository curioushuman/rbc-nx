import { Test, TestingModule } from '@nestjs/testing';

import { Profile } from '../schema';
import { ProfilesService } from '../profiles.service';
import {
  profileExisting,
  createProfileProfile,
  updateProfileProfile,
  createProfileMember,
  updateProfileMember,
  createProfileMap,
  updateProfileMap,
} from './stubs/profile.stub';
import {
  memberExisting,
  memberWithoutProfile,
} from '../../members/test/stubs/member.stub';
import { Member } from '../../members/schema';

import { MembersService } from '../../members/members.service';
jest.mock('../../members/members.service');

describe('ProfilesService', () => {
  let service: ProfilesService;

  describe('find operations', () => {
    let membersService: MembersService;
    let memberId: string;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [ProfilesService, MembersService],
      }).compile();

      service = moduleRef.get<ProfilesService>(ProfilesService);
      membersService = moduleRef.get<MembersService>(MembersService);

      memberId = memberExisting().id;

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when record exists', () => {
        let profile: Profile;

        beforeEach(async () => {
          jest.spyOn(membersService, 'findOne');
          profile = await service.findOne(memberId);
        });

        test('then it should call the members service', () => {
          expect(membersService.findOne).toHaveBeenCalledWith(memberId);
        });

        test('then it should return a profile', () => {
          expect(profile).toEqual(profileExisting());
        });
      });
      describe('when NO record exists', () => {
        let profile;

        test('then it should return NULL', async () => {
          profile = await service.findOne('not-a-real-memberId');
          expect(profile).toBeNull();
        });
      });
    });
    describe('findMember', () => {
      describe('when record exists', () => {
        let member: Member;

        beforeEach(async () => {
          jest.spyOn(membersService, 'findOne');
          member = await service.findMember(memberId);
        });

        test('then it should call the members service', () => {
          expect(membersService.findOne).toHaveBeenCalledWith(memberId);
        });

        test('then it should return a member', () => {
          expect(member).toEqual(memberExisting());
        });
      });
      describe('when NO record exists', () => {
        let member;

        test('then it should return NULL', async () => {
          member = await service.findMember('not-a-real-memberId');
          expect(member).toBeNull();
        });
      });
    });
  });
  describe('save operations', () => {
    let membersService: MembersService;
    let member: Member;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [ProfilesService, MembersService],
      }).compile();

      service = moduleRef.get<ProfilesService>(ProfilesService);
      membersService = moduleRef.get<MembersService>(MembersService);

      member = memberWithoutProfile();

      jest.clearAllMocks();
    });

    describe('create', () => {
      describe('when create is successful', () => {
        let saveSpy: jest.SpyInstance;
        let profile: Profile;

        beforeEach(async () => {
          saveSpy = jest.spyOn(membersService, 'updateMember');
          profile = await service.create(member, createProfileMap());
        });

        test('then it should call the members service updateMember', () => {
          expect(saveSpy).toHaveBeenCalledWith(createProfileMember());
        });

        test('then it should return the created profile', () => {
          expect(profile).toEqual(createProfileProfile());
        });
      });
    });

    describe('update', () => {
      describe('when update is successful', () => {
        let saveSpy: jest.SpyInstance;
        let profile: Profile;

        beforeEach(async () => {
          saveSpy = jest.spyOn(membersService, 'updateMember');
          profile = await service.update(memberExisting(), updateProfileMap());
        });

        test('then it should call the members service updateMember', () => {
          expect(saveSpy).toHaveBeenCalledWith(updateProfileMember());
        });

        test('then it should return the updated profile', () => {
          expect(profile).toEqual(updateProfileProfile());
        });
      });
    });
  });
});
