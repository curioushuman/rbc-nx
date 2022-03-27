import { IsEmail, IsNotEmpty } from 'class-validator';

// TODO
// - will AutoMap work alongside swagger.PartialType?
//   - it may not matter if I move Automapper out of this section anyway

export class UpdateMemberDto {
  /**
   * Identifier for member. Set to the ID of this person in the CRM.
   */
  @IsNotEmpty()
  id!: string;

  /**
   * Email address of the member.
   * @example joliet@bluesbrothers.com
   */
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
