import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Profile {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
