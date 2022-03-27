import { Injectable } from '@nestjs/common';

import { Member, MemberEmail } from './schema';

/**
 * TODO
 * [ ] be able to use this service in the email decorator (without cheekiness)
 */

@Injectable()
export class MembersEmailService {
  /**
   * If people change their email, it becomes the new primary
   * We want to hold on to their old emails though, for CRM checking etc
   */
  mergePrimaryEmail(member: Member, primaryEmail: string): void {
    if (!member.emails || member.emails.length === 0) {
      member.emails = [this.createPrimaryEmail(primaryEmail)];
    }
    member.emails = this.updatePrimaryEmail(member.emails, primaryEmail);
  }

  updatePrimaryEmail(
    emails: MemberEmail[],
    primaryEmail: string,
  ): MemberEmail[] {
    // reset all emails to not primary
    let primaryExists = false;
    emails = emails.map((email) => {
      email.primary = false;
      if (email.email === primaryEmail) {
        email.primary = true;
        primaryExists = true;
      }
      return email;
    });
    if (!primaryExists) {
      emails.push(this.createPrimaryEmail(primaryEmail));
    }
    return emails;
  }

  createPrimaryEmail(email: string): MemberEmail {
    return createPrimaryEmail(email);
  }

  getPrimaryEmail(member: Member): string | null {
    return getPrimaryEmail(member);
  }
}

export const getPrimaryEmail = (member: Member): string | null => {
  if (!member.emails) {
    return null;
  }
  const primaryEmails = member.emails.filter((email) => email.primary);
  return primaryEmails.length ? primaryEmails[0].email : null;
};

export const createPrimaryEmail = (email: string): MemberEmail => {
  return {
    email,
    primary: true,
  };
};
