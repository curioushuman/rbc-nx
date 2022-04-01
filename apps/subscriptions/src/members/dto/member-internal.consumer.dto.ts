import { IsEmail, IsNotEmpty } from 'class-validator';

export class MemberInternalConsumerDto {
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
