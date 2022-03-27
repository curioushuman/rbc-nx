import { Expose } from 'class-transformer';

import { Member } from '../schema';
import { Profile } from '../../profiles/schema';

/**
 * This converts data coming in (via DTO) to underlying DB structure
 *
 * Expose: allows data from DTO to be written directly to these fields
 * Transform: transforms info from DTO to DB structure
 */
export class UpdateMemberMap implements Partial<Member> {
  @Expose()
  id: string;

  // * This can only be 'transformed' once we have obtained member data
  @Expose()
  email: string;

  profile?: Profile;
}
