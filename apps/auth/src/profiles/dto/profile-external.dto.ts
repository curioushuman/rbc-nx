import { Expose } from 'class-transformer';

/**
 * This converts data from DB structure, to consistent DTO structure
 *
 * Expose: allows data from DTO to be written directly to these fields
 * Transform: transforms info from DTO to DB structure
 */
export class ProfileExternalDto {
  /**
   * Members first name
   * @example Jake
   */
  @Expose()
  firstName: string;

  /**
   * Members last name
   * @example Blues
   */
  @Expose()
  lastName: string;
}
