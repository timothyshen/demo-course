import { IsNotEmpty } from 'class-validator';

export class createCourseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  section: string;

  @IsNotEmpty()
  markdown: string;
}
