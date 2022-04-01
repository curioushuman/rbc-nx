import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Member, MemberSchema } from './schema';
import { MembersRepository } from './members.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  ],
  controllers: [MembersController],
  providers: [MembersService, MembersRepository],
})
export class MembersModule {}
