import {
  CreateProfileDto,
  UpdateProfileDto,
  ProfileExternalDto,
} from '../../dto';
import { Profile } from '../../schema';
import {
  memberExisting,
  memberWithoutProfile,
} from '../../../members/test/stubs/member.stub';
import { Member } from '../../../members/schema';
import { CreateProfileMap, UpdateProfileMap } from '../../mappers';

export const profileExisting = (): Profile => {
  return memberExisting().profile;
};

export const profileExtResponse = (): ProfileExternalDto => {
  return profileExisting() as ProfileExternalDto;
};

export const profileEmpty = (): Profile => {
  return {} as Profile;
};

export const createProfileDto = (): CreateProfileDto => {
  return {
    firstName: 'Elwood',
    lastName: 'Blues',
  };
};

export const createProfileMap = (): CreateProfileMap => {
  return {
    firstName: createProfileDto().firstName,
    lastName: createProfileDto().lastName,
  };
};

export const createProfileMember = (): Member => {
  const member = memberWithoutProfile();
  member.profile = createProfileDto() as Profile;
  return member;
};

export const createProfileProfile = (): Profile =>
  createProfileDto() as Profile;

export const createErrorDto = (): CreateProfileDto => {
  return {
    firstName: 'ERROR',
    lastName: 'bad',
  };
};

export const updateProfileDto = (): UpdateProfileDto => {
  return {
    firstName: 'Joliet',
    lastName: 'Blues',
  };
};

export const updateProfileMap = (): UpdateProfileMap => {
  return {
    firstName: updateProfileDto().firstName,
    lastName: updateProfileDto().lastName,
  };
};

export const updateProfileMember = (): Member => {
  const member = memberExisting();
  member.profile = updateProfileDto() as Profile;
  return member;
};

export const updateProfileProfile = (): Profile => {
  return updateProfileDto() as Profile;
};

export const updateErrorDto = (): UpdateProfileDto =>
  createErrorDto() as UpdateProfileDto;
