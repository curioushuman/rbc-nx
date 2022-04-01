import { MongoDbMockModel } from '@curioushuman/mongo-db';

import { Tier } from '../../schema';
import { tierExisting } from '../stubs/tier.stub';

export class TierMockModel extends MongoDbMockModel<Tier> {
  protected entityStub = tierExisting();
}
