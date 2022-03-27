import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SerializeInterceptor } from '@curioushuman/nestjs-utils';

import { MembersService } from './members.service';
import { CreateMemberDto, UpdateMemberDto, MemberExternalDto } from './dto';
import { Member } from './schema';
import { plainToInstance } from 'class-transformer';
import { CreateMemberMap, UpdateMemberMap } from './mappers';

@SerializeInterceptor(MemberExternalDto)
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  /**
   * Get all members
   */
  @Get()
  async get() {
    try {
      return await this.membersService.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get a member
   */
  @Get(':id')
  async getOne(@Param('id') id: string) {
    let member: Member;
    try {
      member = await this.membersService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }

  /**
   * Create a member
   */
  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {
    // map DTO to DB structure so service can deal with it
    const memberMapped = plainToInstance(CreateMemberMap, createMemberDto, {
      excludeExtraneousValues: true,
    });
    try {
      return await this.membersService.create(memberMapped);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Update a member
   * TODO: separate PUT and PATCH; probably after you've created a separate module for profile
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto
  ) {
    const member = await this.getOne(id);
    // map DTO to DB structure so service can deal with it
    const memberMapped = plainToInstance(UpdateMemberMap, updateMemberDto, {
      excludeExtraneousValues: true,
    });
    try {
      return await this.membersService.update(member, memberMapped);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
