import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserProgressDto {
  @IsString()
  userId: string;

  @IsString()
  courseId: string;

  @IsBoolean()
  completed: boolean;
}


