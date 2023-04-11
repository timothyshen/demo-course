import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface Course {
  name: string;
  description: string;
  content: Types.ObjectId;
  createdDate?: Date;
  updatedDate?: Date;
}

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'CourseContent' })
  content: Types.ObjectId;

  @Prop({ default: Date.now })
  createdDate?: Date;

  @Prop({ default: Date.now })
  updatedDate?: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
