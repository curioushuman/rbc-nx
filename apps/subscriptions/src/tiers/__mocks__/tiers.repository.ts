import { when } from 'jest-when';

import { tierExisting } from '../test/stubs/tier.stub';

const findOne = jest.fn().mockResolvedValue(null);
when(findOne)
  .calledWith({ label: tierExisting().label })
  .mockResolvedValue(tierExisting());

const find = jest.fn().mockResolvedValue([tierExisting()]);
// TODO - reinstate this later when we support find(filter)
// const find = jest.fn().mockResolvedValue([]);
// when(find)
//   .calledWith({ label: tierExisting().label })
//   .mockResolvedValue([tierExisting()]);

export const TiersRepository = jest.fn().mockReturnValue({
  findOne,
  find,
  save: jest.fn().mockImplementation((tier) => Promise.resolve(tier)),
});
