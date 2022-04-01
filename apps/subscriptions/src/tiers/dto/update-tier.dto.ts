import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTierDto {
  /**
   * Machine readable name for the tier e.g. 'gold'
   */
  @IsString()
  @IsNotEmpty()
  label!: string;
}
