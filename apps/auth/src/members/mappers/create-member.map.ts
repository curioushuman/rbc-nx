import { Expose } from 'class-transformer';

import { Member, MemberEmail } from '../schema';
import { Profile } from '../../profiles/schema';
import { CreatePrimaryEmail } from '../decorators/members-email.decorator';

/**
 * This converts data coming in (via DTO) to underlying DB structure
 *
 * Expose: allows data from DTO to be written directly to these fields
 * Transform: transforms info from DTO to DB structure
 */
export class CreateMemberMap implements Partial<Member> {
  @Expose()
  id: string;

  @Expose()
  @CreatePrimaryEmail()
  emails: MemberEmail[];

  profile?: Profile;
}
