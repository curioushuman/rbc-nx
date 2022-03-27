import { Expose } from 'class-transformer';

import { PrimaryEmail } from '../decorators/members-email.decorator';

export class MemberInternalDto {
  /**
   * Identifier for member. Set to the ID of this person in the CRM.
   */
  @Expose()
  id: string;

  /**
   * Email address of the member.
   * @example joliet@bluesbrothers.com
   */
  @Expose()
  @PrimaryEmail()
  email: string;
}
