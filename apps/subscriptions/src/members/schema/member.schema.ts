import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';

@Schema()
export class Member {
  @Prop({ type: Types.ObjectId, required: true, unique: true })
  id!: string;

  @Prop({ required: true })
  email!: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
export type MemberDocument = Member & Document;

export type MemberModel = Model<MemberDocument>;
