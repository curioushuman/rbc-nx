import { CreateTierDto, UpdateTierDto, TierExternalDto } from '../../dto';
import { CreateTierMap, UpdateTierMap } from '../../mappers';
import { Tier } from '../../schema';

export const createTierDto = (): CreateTierDto => {
  return {
    label: 'Gold',
  };
};

export const createTierMap = (): CreateTierMap => {
  return {
    label: createTierDto().label,
  };
};

export const createTierTier = (): Tier => createTierMap() as Tier;

export const createErrorDto = (): CreateTierDto => {
  return {
    label: 'ERROR',
  };
};

export const updateTierDto = (): UpdateTierDto => {
  return {
    label: 'Platinum',
  };
};

export const updateTierMap = (): UpdateTierMap => {
  return {
    label: updateTierDto().label,
  };
};

export const updateTierTier = (): Tier => {
  return {
    label: updateTierDto().label,
  };
};

export const updateErrorDto = (): UpdateTierDto => {
  return {
    label: createErrorDto().label,
  };
};

export const tierExisting = (): Tier => {
  return {
    label: createTierDto().label,
  };
};

export const tierResponse = (): TierExternalDto => {
  return {
    label: tierExisting().label,
  };
};
