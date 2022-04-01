import { MemberInternalConsumerDto } from '../../dto';
import { CreateMemberMap, UpdateMemberMap } from '../../mappers';
import { Member } from '../../schema';

export const createMemberInternalDto = (): MemberInternalConsumerDto => {
  return {
    id: 'dtf3',
    email: 'jake@bluesbrothers.com',
  };
};

export const createMemberMap = (): CreateMemberMap => {
  return {
    id: createMemberInternalDto().id,
    email: createMemberInternalDto().email,
  };
};

export const createMemberMember = (): Member => createMemberMap() as Member;

export const updateMemberInternalDto = (): MemberInternalConsumerDto => {
  return {
    id: createMemberInternalDto().id,
    email: 'joliet@bluesbrothers.com',
  };
};

export const updateMemberMap = (): UpdateMemberMap => {
  return {
    id: updateMemberInternalDto().id,
    email: updateMemberInternalDto().email,
  };
};

export const updateMemberMember = (): Member => {
  return {
    id: updateMemberInternalDto().id,
    email: updateMemberMap().email,
  };
};

export const memberExisting = (): Member => {
  return {
    id: createMemberInternalDto().id,
    email: createMemberInternalDto().email,
  };
};
