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
import { Types } from 'mongoose';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: createCourseDto): Promise<Course> {
    return this.courseService.create(
      createCourseDto.name,
      createCourseDto.description,
      createCourseDto.section,
      createCourseDto.markdown,
    );
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: Types.ObjectId): Promise<Course> {
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

  @Get('find/:id')
  async findNextCourseById(@Param('id') id: string): Promise<any> {
    return this.courseService.findNextCourse(id);
  }
}
