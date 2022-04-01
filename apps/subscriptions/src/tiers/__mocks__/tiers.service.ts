import { when } from 'jest-when';

import { tierExisting } from '../test/stubs/tier.stub';

const findOne = jest.fn().mockResolvedValue(null);
when(findOne)
  .calledWith(tierExisting().label)
  .mockResolvedValue(tierExisting());

const find = jest.fn().mockResolvedValue([tierExisting()]);
// TODO - reinstate when we support this
// const find = jest.fn().mockResolvedValue([]);
// when(find)
//   .calledWith(tierExisting().label)
//   .mockResolvedValue([tierExisting()]);

export const TiersService = jest.fn().mockReturnValue({
  findOne,
  find,
  create: jest.fn().mockResolvedValue(tierExisting()),
  update: jest.fn().mockResolvedValue(tierExisting()),
  save: jest.fn().mockResolvedValue(tierExisting()),
});
