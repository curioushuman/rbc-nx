import {
  CreateMemberDto,
  UpdateMemberDto,
  MemberExternalDto,
  MemberInternalDto,
} from '../../dto';
import { CreateMemberMap, UpdateMemberMap } from '../../mappers';
import { Member, MemberEmail } from '../../schema';
// import { EmailTypeEnum } from '../../types';

// * These stubs assume email.type is not being used

const memberEmailWork = 'jake@bluesbrothers.com';
const memberEmailPersonal = 'jakey@homeofblues.com';
const memberOtherWork = 'elwood@bluesbrothers.com';
// const memberOtherPersonal = 'lady.e@homeofblues.com';

export const memberEmail = (email: string, primary = true): MemberEmail => {
  return {
    email,
    primary,
    // type: EmailTypeEnum.Work,
  };
};

export const memberWithoutProfile = (): Member => {
  return {
    id: 'def456',
    emails: [memberEmail(memberOtherWork)],
  };
};

export const memberExisting = (): Member => {
  return {
    id: 'abc123',
    emails: [memberEmail(memberEmailWork)],
    profile: {
      firstName: 'Jake',
      lastName: 'Blues',
    },
  };
};

export const memberExtResponse = (): MemberExternalDto => {
  return {
    id: memberExisting().id,
    email: memberEmailWork,
  };
};

export const memberIntResponse = (): MemberInternalDto => {
  return {
    id: memberExisting().id,
    email: memberEmailWork,
  };
};

export const createMemberDto = (): CreateMemberDto => {
  return {
    id: memberExisting().id,
    email: memberEmailWork,
  };
};

export const createMemberMap = (): CreateMemberMap => {
  return {
    id: memberExisting().id,
    emails: [memberEmail(memberEmailWork)],
  };
};

export const createMemberMember = (): Member => createMemberMap() as Member;

export const createErrorDto = (): CreateMemberDto => {
  return {
    id: 'ERROR',
    email: 'bad',
  };
};

export const updateMemberDto = (): UpdateMemberDto => {
  return {
    id: memberExisting().id,
    email: memberEmailPersonal,
  };
};

export const updateMemberMap = (): UpdateMemberMap => {
  return {
    id: memberExisting().id,
    email: memberEmailPersonal,
  };
};

export const updateMemberMember = (): Member => {
  return {
    id: memberExisting().id,
    // email: 'wtf',
    emails: [
      memberEmail(memberEmailWork, false),
      memberEmail(memberEmailPersonal),
    ],
    profile: memberExisting().profile,
  };
};

export const updateErrorDto = (): UpdateMemberDto =>
  createErrorDto() as UpdateMemberDto;
