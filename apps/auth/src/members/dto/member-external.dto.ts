import { Expose } from 'class-transformer';

import { PrimaryEmail } from '../decorators/members-email.decorator';
/**
 * This converts data from DB structure, to consistent DTO structure
 *
 * Expose: allows data from DTO to be written directly to these fields
 * Transform: transforms info from DTO to DB structure
 */
export class MemberExternalDto {
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
