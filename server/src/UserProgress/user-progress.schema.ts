import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserProgressDocument = UserProgress & Document;

@Schema()
export class UserProgress {
  @Prop({ type: Types.ObjectId, ref: 'Course' })
  courseId: Types.ObjectId; // reference to Course document

  @Prop({ required: true })
  userId: string;

  @Prop({ default: false })
  completed: boolean;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);

UserProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
