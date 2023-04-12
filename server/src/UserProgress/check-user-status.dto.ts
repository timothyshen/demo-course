import { IsNotEmpty, IsString } from 'class-validator';

export class checkCourseStatusDto {
  userId: string;
  courseId: string;
}
