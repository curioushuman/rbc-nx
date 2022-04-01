import { when } from 'jest-when';

import {
  createMemberMember,
  memberExisting,
  updateMemberMember,
} from '../test/stubs/member.stub';

const findOne = jest.fn().mockResolvedValue(null);
when(findOne)
  .calledWith(memberExisting().id)
  .mockResolvedValue(memberExisting());

const find = jest.fn().mockResolvedValue([memberExisting()]);
// TODO - reinstate when we support this
// const find = jest.fn().mockResolvedValue([]);
// when(find)
//   .calledWith(memberExisting().label)
//   .mockResolvedValue([memberExisting()]);

export const MembersService = jest.fn().mockReturnValue({
  findOne,
  find,
  create: jest.fn().mockReturnValue(createMemberMember()),
  update: jest.fn().mockReturnValue(updateMemberMember()),
  save: jest.fn().mockReturnValue(memberExisting()),
});
