import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';

import { Member } from './schema';
import { MembersRepository } from './members.repository';
import { CreateMemberMap, UpdateMemberMap } from './mappers';
import { MembersEmailService } from './members-email.service';
import { MembersProducerService } from './members-producer.service';

/**
 * TODO
 * [ ] Add more complete logging using logger
 */
@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);

  constructor(
    private readonly membersRepository: MembersRepository,
    private readonly producerService: MembersProducerService,
    private readonly emailService: MembersEmailService
  ) {}

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
    // update the ecosystem, but don't wait for it
    this.producerService.sendCreated(member);
    // log the member
    this.logger.log(`Created member: ${member.id}`);
    // return the member
    return member;
  }

  async update(member: Member, memberMapped: UpdateMemberMap): Promise<Member> {
    // merge the new info with the member
    member = this.merge(member, memberMapped);
    // update the member
    return this.updateMember(member);
  }

  async updateMember(member: Member): Promise<Member> {
    // save the member
    member = await this.save(member);
    // update the ecosystem, but don't wait for it
    this.producerService.sendUpdated(member);
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
    // Strip extraneous properties from member DTO
    // * NOTE: this is the only time we exclude extraneous values
    //   between map and Model.
    const updatedMember = plainToInstance(Member, memberMapped, {
      excludeExtraneousValues: true,
    });
    const currentPrimaryEmail = this.emailService.getPrimaryEmail(member);
    // update the emails with the new one provided
    this.emailService.mergePrimaryEmail(member, memberMapped.email);
    // check if email has changed
    this.checkChangePrimaryEmail(member, currentPrimaryEmail);
    // merge the rest of the info with the member
    return merge(member, updatedMember);
  }

  checkChangePrimaryEmail(member: Member, primaryEmail: string): void {
    const newPrimaryEmail = this.emailService.getPrimaryEmail(member);
    if (newPrimaryEmail !== primaryEmail) {
      this.producerService.sendEmailUpdated(member);
    }
  }
}
