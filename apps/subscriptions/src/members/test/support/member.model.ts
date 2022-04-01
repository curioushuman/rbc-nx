import { MongoDbMockModel } from '@curioushuman/mongo-db';

import { Member } from '../../schema';
import { memberExisting } from '../stubs/member.stub';

export class MemberMockModel extends MongoDbMockModel<Member> {
  protected entityStub = memberExisting();
}
