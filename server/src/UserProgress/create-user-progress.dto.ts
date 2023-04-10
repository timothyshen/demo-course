import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserProgressDto {
  @IsNotEmpty()
  courseId: Types.ObjectId;

  @IsNotEmpty()
  userId: string;
}
