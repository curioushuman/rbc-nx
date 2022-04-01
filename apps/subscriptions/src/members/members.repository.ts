import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbRepository } from '@curioushuman/mongo-db';

import { Member, MemberModel, MemberDocument } from './schema';

@Injectable()
export class MembersRepository extends MongoDbRepository<
  MemberDocument,
  Member
> {
  constructor(@InjectModel(Member.name) memberModel: MemberModel) {
    super(memberModel);
  }
}
