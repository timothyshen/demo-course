import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.schema';
import { CourseContent } from './course-content.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(CourseContent.name)
    private courseContentModel: Model<CourseContent>,
  ) {}

  async create(name: string, description: string, markdown: string) {
    const content = new this.courseContentModel({ markdown });
    const course = new this.courseModel({ name, description, content });
    await content.save();
    await course.save();
    return course;
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async findById(courseId: string): Promise<Course> {
    const course = await this.courseModel
      .findById(courseId)
      .populate('content');
    return course;
  }

  async update(id: string, updateCourseDto: Course): Promise<Course> {
    const contentId = this.courseModel.findById(id);
    return this.courseContentModel.findByIdAndUpdate(
      (await contentId).content,
      updateCourseDto,
    );
  }

  async delete(id: string): Promise<Course> {
    return this.courseModel.findByIdAndDelete(id);
  }
}
