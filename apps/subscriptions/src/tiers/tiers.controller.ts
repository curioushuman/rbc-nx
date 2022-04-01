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
import { plainToInstance } from 'class-transformer';
import { SerializeInterceptor } from '@curioushuman/nestjs-utils';

import { TiersService } from './tiers.service';
import { CreateTierDto, UpdateTierDto, TierExternalDto } from './dto';
import { Tier } from './schema';
import { CreateTierMap, UpdateTierMap } from './mappers';

@SerializeInterceptor(TierExternalDto)
@Controller('tiers')
export class TiersController {
  constructor(private readonly tiersService: TiersService) {}

  /**
   * Get all tiers
   */
  @Get()
  async get() {
    try {
      return await this.tiersService.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Get a tier
   */
  @Get(':label')
  async getOne(@Param('label') label: string) {
    let tier: Tier;
    try {
      tier = await this.tiersService.findOne(label);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!tier) {
      throw new NotFoundException('Tier not found');
    }
    return tier;
  }

  /**
   * Create a tier
   */
  @Post()
  async create(@Body() createTierDto: CreateTierDto) {
    // map DTO to DB structure
    const tierMapped = plainToInstance(CreateTierMap, createTierDto, {
      excludeExtraneousValues: true,
    });
    try {
      return await this.tiersService.create(tierMapped);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Update a tier
   */
  @Put(':label')
  async update(
    @Param('label') label: string,
    @Body() updateTierDto: UpdateTierDto
  ) {
    const tier = await this.getOne(label);
    // map DTO to DB structure
    const tierMapped = plainToInstance(UpdateTierMap, updateTierDto, {
      excludeExtraneousValues: true,
    });
    try {
      return await this.tiersService.update(tier, tierMapped);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
