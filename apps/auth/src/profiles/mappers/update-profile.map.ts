import { Expose } from 'class-transformer';

import { Profile } from '../schema';

/**
 * This converts data coming in (via DTO) to underlying DB structure
 *
 * Expose: allows data from DTO to be written directly to these fields
 * Transform: transforms info from DTO to DB structure
 */
export class UpdateProfileMap implements Partial<Profile> {
  @Expose()
  firstName?: string;

  @Expose()
  lastName: string;
}
