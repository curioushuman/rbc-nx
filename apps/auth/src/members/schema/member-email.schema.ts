import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EmailTypeEnum } from '../types/email-type.enum';

@Schema({ _id: false })
export class MemberEmail {
  @Prop({ required: true })
  email!: string;

  /**
   * * UPDATE: removed default value
   * // default: Object.values(EmailTypeEnum)[0],
   * I'll include this once it proves useful
   */
  @Prop({
    enum: Object.values(EmailTypeEnum),
    type: String,
  })
  type?: EmailTypeEnum;

  @Prop({ default: false })
  primary?: boolean;
}

export const MemberEmailSchema = SchemaFactory.createForClass(MemberEmail);
