import { plainToInstance, Expose } from 'class-transformer';
import {
  createMemberDto,
  updateMemberMember,
} from '../../test/stubs/member.stub';
import { MemberEmail } from '../../schema';
import { CreatePrimaryEmail, PrimaryEmail } from '../members-email.decorator';

class TestClass {
  @Expose()
  @PrimaryEmail()
  email: string;
}

class TestCreateClass {
  @Expose()
  @CreatePrimaryEmail()
  emails: MemberEmail[];
}

describe('members-email-decorator(s)', () => {
  describe('PrimaryEmail', () => {
    describe('When "Transform-ing from" an object with an array of MemberEmail', () => {
      test('then it should "Transform to" the MemberEmail.email marked as primary, as a string', () => {
        const member = updateMemberMember();
        const test = plainToInstance(TestClass, member);
        expect(test.email).toBe(updateMemberMember().emails[1].email);
      });
    });
  });
  describe('CreatePrimaryEmail', () => {
    describe('When "Transform-ing from" a DTO with an email as a string', () => {
      let testClass: TestCreateClass;
      beforeAll(() => {
        testClass = plainToInstance(TestCreateClass, createMemberDto());
      });
      test('then it should "Transform to" a MemberEmail array of 1', () => {
        expect(testClass.emails[0].email).toBe(createMemberDto().email);
      });
      test('that email should be marked as primary', () => {
        expect(testClass.emails[0].primary).toBe(true);
      });
    });
  });
});
