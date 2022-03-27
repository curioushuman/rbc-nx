import { Test, TestingModule } from '@nestjs/testing';

import { ProfilesController } from '../profiles.controller';
import {
  profileExisting,
  createProfileDto,
  updateProfileDto,
  createProfileProfile,
  updateProfileProfile,
  profileEmpty,
  createProfileMap,
  updateProfileMap,
} from './stubs/profile.stub';
import { Profile } from '../schema';
import {
  memberExisting,
  memberWithoutProfile,
} from '../../members/test/stubs/member.stub';

import { ProfilesService } from '../profiles.service';
jest.mock('../profiles.service');

describe('ProfilesController', () => {
  let controller: ProfilesController;
  let service: ProfilesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [ProfilesService],
    }).compile();

    controller = moduleRef.get<ProfilesController>(ProfilesController);
    service = moduleRef.get<ProfilesService>(ProfilesService);
    jest.clearAllMocks();
  });

  describe('getOne', () => {
    describe('when a member that exists is requested', () => {
      let memberId: string;
      let profile: Profile;

      beforeEach(async () => {
        memberId = memberExisting().id;
        profile = await controller.getOne(memberId);
      });

      test('then it should call service', () => {
        expect(service.findOne).toBeCalledWith(memberId);
      });

      test('then it should return a Profile', () => {
        expect(profile).toEqual(profileExisting());
      });
    });
    describe('when a member that does NOT EXIST is requested', () => {
      test.todo('then it should return a 404');
      // test('then it should return a 404', async (done) => {
      // try {
      // await controller.getOne('not-a-real-profile');
      // } catch (err) {
      // if (err.status === '404') {
      // done();
      // }
      // }
      // });
    });
    describe('when a member exists, but a profile does not', () => {
      let memberId: string;
      let profile: Profile;

      beforeEach(async () => {
        memberId = memberWithoutProfile().id;
        profile = await controller.getOne(memberId);
      });

      test('then it should return an empty Profile', () => {
        expect(profile).toEqual(profileEmpty());
      });
    });
  });

  describe('create', () => {
    describe('when all fields are valid', () => {
      let memberId: string;
      let profile: Profile;

      beforeEach(async () => {
        // UP TO mock controller.findMember
        memberId = memberWithoutProfile().id;
        profile = await controller.create(memberId, createProfileDto());
      });

      test('then it should call service', () => {
        expect(service.create).toHaveBeenCalledWith(
          memberWithoutProfile(),
          createProfileMap(),
        );
      });

      test('then it should return a Profile', () => {
        expect(profile).toEqual(createProfileProfile());
      });
    });
  });
  describe('update', () => {
    describe('when all fields are valid', () => {
      let profile: Profile;

      beforeEach(async () => {
        profile = await controller.update(
          memberExisting().id,
          updateProfileDto(),
        );
      });

      test('then it should call service', () => {
        expect(service.update).toHaveBeenCalledWith(
          memberExisting(),
          updateProfileMap(),
        );
      });

      test('then it should return a Profile', () => {
        expect(profile).toEqual(updateProfileProfile());
      });
    });
  });
});
