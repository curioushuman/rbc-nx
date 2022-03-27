import { when } from 'jest-when';

import {
  createProfileProfile,
  profileExisting,
  updateProfileProfile,
} from '../test/stubs/profile.stub';

import {
  memberExisting,
  memberWithoutProfile,
} from '../../members/test/stubs/member.stub';

const findOne = jest.fn().mockResolvedValue(null);
when(findOne)
  .calledWith(memberExisting().id)
  .mockResolvedValue(profileExisting());
when(findOne).calledWith(memberWithoutProfile().id).mockResolvedValue(null);

const findMember = jest.fn().mockResolvedValue(null);
when(findMember)
  .calledWith(memberExisting().id)
  .mockResolvedValue(memberExisting());
when(findMember)
  .calledWith(memberWithoutProfile().id)
  .mockResolvedValue(memberWithoutProfile());

export const ProfilesService = jest.fn().mockReturnValue({
  findOne,
  findMember,
  create: jest.fn().mockReturnValue(createProfileProfile()),
  update: jest.fn().mockReturnValue(updateProfileProfile()),
});
