import { when } from 'jest-when';

import { memberExisting } from '../test/stubs/member.stub';

const findOne = jest.fn().mockResolvedValue(null);
when(findOne)
  .calledWith({ id: memberExisting().id })
  .mockResolvedValue(memberExisting());

const find = jest.fn().mockResolvedValue([memberExisting()]);
// TODO - reinstate this later when we support find(filter)
// const find = jest.fn().mockResolvedValue([]);
// when(find)
//   .calledWith({ label: memberExisting().label })
//   .mockResolvedValue([memberExisting()]);

const save = jest.fn().mockImplementation((member) => member);

export const MembersRepository = jest.fn().mockReturnValue({
  findOne,
  find,
  save,
});
