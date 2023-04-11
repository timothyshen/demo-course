import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface UserProfile {
  address: string;
  role: string;
  createdDate?: Date;
  updatedDate?: Date;
}

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema()
export class UserProfile extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true, enum: Role, default: Role.USER })
  role: string;

  @Prop({ default: Date.now })
  createdDate?: Date;

  @Prop({ default: Date.now })
  updatedDate?: Date;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);

UserProfileSchema.index({ address: 1 }, { unique: true });
