import { Test, TestingModule } from '@nestjs/testing';

import { MembersController } from '../members.controller';
import {
  memberExisting,
  createMemberMap,
  updateMemberMap,
  createMemberInternalDto,
  updateMemberInternalDto,
} from './stubs/member.stub';

import { MembersService } from '../members.service';
jest.mock('../members.service');

describe('MembersController', () => {
  let controller: MembersController;
  let service: MembersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [MembersService],
    }).compile();

    controller = moduleRef.get<MembersController>(MembersController);
    service = moduleRef.get<MembersService>(MembersService);
    jest.clearAllMocks();
  });

  describe('handleMemberCreated', () => {
    describe('when all fields are valid', () => {
      beforeEach(async () => {
        await controller.handleMemberCreated(createMemberInternalDto());
      });

      test('then it should call service', () => {
        expect(service.create).toHaveBeenCalledWith(createMemberMap());
      });
    });
  });
  describe('handleMemberUpdated', () => {
    describe('when all fields are valid', () => {
      beforeEach(async () => {
        await controller.handleMemberUpdated(updateMemberInternalDto());
      });

      test('then it should call service', () => {
        expect(service.update).toHaveBeenCalledWith(
          memberExisting(),
          updateMemberMap(),
        );
      });
    });
  });
});
