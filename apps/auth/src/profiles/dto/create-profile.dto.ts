import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  /**
   * Members first name
   * @example Jake
   */
  @IsString()
  @IsOptional()
  firstName?: string;

  /**
   * Members last name
   * @example Blues
   */
  @IsString()
  @IsNotEmpty()
  lastName!: string;
}
