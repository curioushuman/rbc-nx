import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TiersService } from './tiers.service';
import { TiersController } from './tiers.controller';
import { Tier, TierSchema } from './schema';
import { TiersRepository } from './tiers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tier.name, schema: TierSchema }]),
  ],
  controllers: [TiersController],
  providers: [TiersService, TiersRepository],
})
export class TiersModule {}
