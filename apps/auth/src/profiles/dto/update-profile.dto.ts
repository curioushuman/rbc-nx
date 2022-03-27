import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  /**
   * Members first name
   * @example Jake
   */
  @IsString()
  @IsOptional()
  firstName?: string;

  /**
   * Members last name
   * * Note: All validation for LastName is on it's original schema
   * @example Blues
   */
  @IsString()
  @IsNotEmpty()
  lastName!: string;
}
