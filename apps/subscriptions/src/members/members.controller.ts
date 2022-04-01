import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';

// ! To be moved to rbc-common
import { MemberInternalConsumerDto } from './dto/member-internal.consumer.dto';

import { CreateMemberMap, UpdateMemberMap } from './mappers';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  /**
   * Create a member
   * TODO
   * [ ] need to throw an error in here, and log it using loggable
   */
  @EventPattern('member.created')
  async handleMemberCreated(data: MemberInternalConsumerDto): Promise<void> {
    // map DTO to DB structure so service can deal with it
    const memberMapped: CreateMemberMap = plainToInstance(
      CreateMemberMap,
      data,
      {
        excludeExtraneousValues: true,
      },
    );
    try {
      await this.membersService.create(memberMapped);
    } catch (error) {
      // throw an error
      console.log(error);
    }
  }

  /**
   * Update a member
   * TODO
   * [ ] need to throw an error in here, and log it using loggable
   */
  @EventPattern('member.updated')
  async handleMemberUpdated(data: MemberInternalConsumerDto): Promise<void> {
    // map DTO to DB structure so service can deal with it
    const memberMapped: UpdateMemberMap = plainToInstance(
      UpdateMemberMap,
      data,
      {
        excludeExtraneousValues: true,
      },
    );
    try {
      const member = await this.membersService.findOne(memberMapped.id);
      await this.membersService.update(member, memberMapped);
    } catch (error) {
      // throw an error
      console.log(error);
    }
  }
}
