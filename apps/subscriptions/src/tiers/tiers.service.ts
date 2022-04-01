import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';

import { CreateTierMap, UpdateTierMap } from './mappers';
import { Tier } from './schema';
import { TiersRepository } from './tiers.repository';

@Injectable()
export class TiersService {
  constructor(private readonly tiersRepository: TiersRepository) {}

  async find(): Promise<Tier[]> {
    return await this.tiersRepository.find({});
  }

  async findOne(label: string): Promise<Tier> {
    return await this.tiersRepository.findOne({ label });
  }

  async create(tierMapped: CreateTierMap): Promise<Tier> {
    // convert to Tier for saving
    let tier = plainToInstance(Tier, tierMapped);
    // save the tier
    tier = await this.save(tier);
    // return the tier
    return tier;
  }

  async update(tier: Tier, tierMapped: UpdateTierMap): Promise<Tier> {
    // merge the new info with the tier
    tier = this.merge(tier, tierMapped);
    // save the tier
    tier = await this.save(tier);
    // return the tier
    return tier;
  }

  async save(tier: Tier): Promise<Tier> {
    return this.tiersRepository.save(tier);
  }

  merge(tier: Tier, tierMapped: UpdateTierMap): Tier {
    return merge(tier, tierMapped);
  }
}
