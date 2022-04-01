import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';

import { Member } from './schema';
import { MembersRepository } from './members.repository';
import { CreateMemberMap, UpdateMemberMap } from './mappers';

/**
 * TODO
 * [ ] Add more complete logging using logger
 */
@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(private readonly membersRepository: MembersRepository) {}

  async find(): Promise<Member[]> {
    return await this.membersRepository.find({});
  }

  async findOne(id: string): Promise<Member | null> {
    return await this.membersRepository.findOne({ id });
  }

  async create(memberMapped: CreateMemberMap): Promise<Member> {
    // convert to Member for saving
    let member = plainToInstance(Member, memberMapped);
    // save the member
    member = await this.save(member);
    // log the member
    this.logger.log(`Created member: ${member.id}`);
    // return the member
    return member;
  }

  async update(member: Member, memberMapped: UpdateMemberMap): Promise<Member> {
    // merge the new info with the member
    member = this.merge(member, memberMapped);
    // save the member
    member = await this.save(member);
    // log the member
    this.logger.log(`Updated member: ${member.id}`);
    // return the member
    return member;
  }

  async save(member: Member): Promise<Member> {
    return this.membersRepository.save(member);
  }

  /**
   * Combine the new information received, with current member information
   */
  merge(member: Member, memberMapped: UpdateMemberMap): Member {
    return merge(member, memberMapped);
  }
}
