import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class CourseContent extends Document {
  @Prop({ required: true })
  markdown: string;

  @Prop({ type: Types.ObjectId, ref: 'Course' })
  course: Types.ObjectId;
}

export const CourseContentSchema = SchemaFactory.createForClass(CourseContent);
