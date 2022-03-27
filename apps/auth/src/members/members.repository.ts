import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoDbRepository } from '@curioushuman/rbc-common';

import { Member, MemberModel, MemberDocument } from './schema';

@Injectable()
export class MembersRepository extends MongoDbRepository<
  MemberDocument,
  Member
> {
  constructor(@InjectModel(Member.name) tierModel: MemberModel) {
    super(tierModel);
  }
}
