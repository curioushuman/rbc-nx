import { Test, TestingModule } from '@nestjs/testing';

import { MembersController } from '../members.controller';
import {
  memberExisting,
  createMemberDto,
  updateMemberDto,
  createMemberMember,
  updateMemberMember,
  createMemberMap,
  updateMemberMap,
} from './stubs/member.stub';
import { Member } from '../schema';

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

  describe('getOne', () => {
    describe('when a record that exists is requested', () => {
      let memberId: string;
      let member: Member;

      beforeEach(async () => {
        memberId = memberExisting().id;
        member = await controller.getOne(memberId);
      });

      test('then it should call service', () => {
        expect(service.findOne).toBeCalledWith(memberId);
      });

      test('then it should return a Member', () => {
        expect(member).toEqual(memberExisting());
      });
    });
    describe('when a record that does NOT EXIST is requested', () => {
      test.todo('then it should return a 404');
      // test('then it should return a 404', async (done) => {
      // try {
      // await controller.getOne('not-a-real-member');
      // } catch (err) {
      // if (err.status === '404') {
      // done();
      // }
      // }
      // });
    });
  });

  describe('get', () => {
    describe('when records exist', () => {
      let members: Member[];

      beforeEach(async () => {
        members = await controller.get();
      });

      test('then it should call service', () => {
        expect(service.find).toHaveBeenCalled();
      });

      test('then it should return an array of Members', () => {
        expect(members).toEqual([memberExisting()]);
      });
    });
  });

  describe('create', () => {
    describe('when all fields are valid', () => {
      let member: Member;

      beforeEach(async () => {
        member = await controller.create(createMemberDto());
      });

      test('then it should call service', () => {
        expect(service.create).toHaveBeenCalledWith(createMemberMap());
      });

      test('then it should return a Member', () => {
        expect(member).toEqual(createMemberMember());
      });
    });
  });
  describe('update', () => {
    describe('when all fields are valid', () => {
      let member: Member;

      beforeEach(async () => {
        member = await controller.update(
          memberExisting().id,
          updateMemberDto(),
        );
      });

      test('then it should call service', () => {
        expect(service.update).toHaveBeenCalledWith(
          memberExisting(),
          updateMemberMap(),
        );
      });

      test('then it should return a Member', () => {
        expect(member).toEqual(updateMemberMember());
      });
    });
  });
});
