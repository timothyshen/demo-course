import * as mongoose from 'mongoose';

export interface CourseContent {
  courseId: string;
  content: string;
  createdDate?: Date;
  updatedDate?: Date;
}
