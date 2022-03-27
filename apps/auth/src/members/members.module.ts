import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MembersRepository } from './members.repository';
import { MembersEmailService } from './members-email.service';
import { MembersProducerService } from './members-producer.service';
import { Member, MemberSchema } from './schema';

// TODO
// * add roles as child document to member
// - 3rd party accounts can also be in their own module
// - abstract microservice so we don't mention NATS here

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'NATS',
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.NATS,
            options: {
              servers: configService.get<string[]>('nats.options.servers'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MembersController],
  providers: [
    MembersService,
    MembersEmailService,
    MembersRepository,
    MembersProducerService,
  ],
  exports: [MembersService],
})
export class MembersModule {}
