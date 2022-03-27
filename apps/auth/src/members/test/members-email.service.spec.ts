import { Test, TestingModule } from '@nestjs/testing';
import { MembersEmailService } from '../members-email.service';
import { Member, MemberEmail } from '../schema';
import {
  createMemberMember,
  updateMemberMember,
  memberEmail,
} from './stubs/member.stub';

describe(MembersEmailService.name, () => {
  let service: MembersEmailService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [MembersEmailService],
    }).compile();

    service = moduleRef.get<MembersEmailService>(MembersEmailService);
  });
  describe('getPrimaryEmail', () => {
    describe('when primary email exists', () => {
      test('then it should return the primary email as a string', () => {
        const primaryEmail = service.getPrimaryEmail(updateMemberMember());
        expect(primaryEmail).toBe(updateMemberMember().emails[1].email);
      });
    });

    describe('when NO primary email exists', () => {
      test('then it should return NULL', () => {
        const member = updateMemberMember();
        member.emails[1].primary = false;
        const primaryEmail = service.getPrimaryEmail(member);
        expect(primaryEmail).toBeNull();
      });
    });
  });
  describe('createPrimaryEmail', () => {
    describe('when provided an email', () => {
      test('then it should return MemberEmail marked as primary', () => {
        const email = 'email@email.com';
        const memEmail = memberEmail(email, true);
        const primaryEmail = service.createPrimaryEmail(email);
        expect(primaryEmail).toEqual(memEmail);
      });
    });
  });
  describe('updatePrimaryEmail', () => {
    describe('when primary email exists', () => {
      let member: Member;
      beforeAll(() => {
        member = updateMemberMember();
        member.emails = service.updatePrimaryEmail(
          member.emails,
          member.emails[0].email,
        );
      });
      test('then it should set that email to be primary', () => {
        expect(member.emails[0].primary).toBe(true);
      });
      test('then it should set others to NOT primary', () => {
        expect(member.emails[1].primary).toBe(false);
      });
    });
    describe('when primary email DOES NOT exist', () => {
      let email: string;
      let member: Member;
      let memEmail: MemberEmail;
      beforeAll(() => {
        email = 'email@email.com';
        memEmail = memberEmail(email, true);
        member = createMemberMember();
        member.emails = service.updatePrimaryEmail(member.emails, email);
      });
      test('then it should add a new MemberEmail', () => {
        expect(member.emails.length).toBe(2);
      });
      test('this email should be marked as primary', () => {
        expect(member.emails[1]).toEqual(memEmail);
      });
      test('then it should add set others to NOT primary', () => {
        expect(member.emails[0].primary).toBe(false);
      });
    });
  });
  describe('mergePrimaryEmail', () => {
    describe('when NO emails exist', () => {
      test('then it should add a new MemberEmail', () => {
        const email = 'email@email.com';
        const member = createMemberMember();
        member.emails = [];
        service.mergePrimaryEmail(member, email);
        expect(member.emails.length).toBe(1);
      });
    });
  });
});
