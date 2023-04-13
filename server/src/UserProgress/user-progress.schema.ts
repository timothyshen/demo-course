import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface UserProgress {
  courseId: Types.ObjectId; // reference to Course document
  userId: string;
  completed: boolean;
  previousCourseProgress: Types.ObjectId;
}

@Schema()
export class UserProgress extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Course' })
  courseId: Types.ObjectId; // reference to Course document

  @Prop({ required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'UserProgress' })
  previousCourseProgress: Types.ObjectId;

  @Prop({ default: false })
  completed: boolean;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);

UserProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
