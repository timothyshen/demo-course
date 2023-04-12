import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Course } from './course.schema';
import { CourseService } from './course.service';
import { createCourseDto } from './course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: createCourseDto): Promise<Course> {
    return this.courseService.create(
      createCourseDto.name,
      createCourseDto.description,
      createCourseDto.markdown,
    );
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Course> {
    return this.courseService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() markdown: string,
  ): Promise<Course> {
    return this.courseService.update(id, markdown);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Course> {
    return this.courseService.delete(id);
  }
}
