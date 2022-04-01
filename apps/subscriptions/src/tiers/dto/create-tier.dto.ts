import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTierDto {
  /**
   * Machine readable name for the tier e.g. 'gold'
   */
  @IsString()
  @IsNotEmpty()
  label!: string;
}
