export const MembersProducerService = jest.fn().mockReturnValue({
  sendCreated: jest.fn(),
  sendUpdated: jest.fn(),
  sendEmailUpdated: jest.fn(),
});
