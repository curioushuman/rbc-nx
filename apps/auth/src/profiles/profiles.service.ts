import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { merge } from 'lodash';

import { Member } from '../members/schema';
import { Profile } from './schema';
import { MembersService } from '../members/members.service';
import { CreateProfileMap, UpdateProfileMap } from './mappers';

// TODO
// [ ] should "map DTO to DB structure" be in a decorator?

@Injectable()
export class ProfilesService {
  constructor(private readonly membersService: MembersService) {}

  async findOne(memberId: string): Promise<Profile | null> {
    const member = await this.membersService.findOne(memberId);
    return member?.profile ? member.profile : null;
  }

  async findMember(memberId: string): Promise<Member | null> {
    return await this.membersService.findOne(memberId);
  }

  async create(
    member: Member,
    profileMapped: CreateProfileMap,
  ): Promise<Profile> {
    // convert to Profile for saving
    const profile = plainToInstance(Profile, profileMapped);
    // save the member with profile
    member.profile = profile;
    member = await this.membersService.updateMember(member);
    // return the profile
    return member.profile;
  }

  async update(
    member: Member,
    profileMapped: UpdateProfileMap,
  ): Promise<Profile> {
    // merge the new info with the profile
    member.profile = this.merge(member.profile, profileMapped);
    // save the profile
    member = await this.membersService.updateMember(member);
    // return the profile
    return member.profile;
  }

  merge(profile: Profile, profileMapped: UpdateProfileMap): Profile {
    return merge(profile, profileMapped);
  }
}
