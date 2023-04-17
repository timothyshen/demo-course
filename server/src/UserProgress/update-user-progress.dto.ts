import { IsBoolean, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserProgressDto {
  @IsString()
  userId: string;

  @IsString()
  courseId: Types.ObjectId;

  @IsBoolean()
  completed: boolean;
}
