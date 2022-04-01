import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbRepository } from '@curioushuman/mongo-db';

import { Tier, TierModel, TierDocument } from './schema';

@Injectable()
export class TiersRepository extends MongoDbRepository<TierDocument, Tier> {
  constructor(@InjectModel(Tier.name) tierModel: TierModel) {
    super(tierModel);
  }
}
