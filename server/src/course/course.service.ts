import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from './course.schema';
import { CourseContent } from './course-content.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(CourseContent.name)
    private courseContentModel: Model<CourseContent>,
  ) {}

  async create(
    name: string,
    description: string,
    section: string,
    markdown: string,
  ): Promise<Course> {
    const content = new this.courseContentModel({ markdown });
    await content.save();

    let course;
    // Find the most recent course

    const findCourse = await this.courseModel
      .find({ section })
      .sort({ _id: -1 })
      .limit(1);

    if (findCourse.length > 0) {
      course = new this.courseModel({
        name,
        description,
        section,
        content: content._id,
        previousCourse: findCourse[0]._id,
      });
    } else {
      course = new this.courseModel({
        name,
        description,
        section,
        content: content._id,
      });
    }

    await course.save();
    return course;
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async findById(courseId: Types.ObjectId): Promise<Course> {
    const course = await this.courseModel
      .findById(courseId)
      .populate('content');
    return course;
  }

  async update(id: string, contentDoc: string): Promise<Course> {
    const course = await this.courseModel.findById(id);

    return this.courseContentModel.findByIdAndUpdate(
      { _id: course.content },
      {
        markdown: contentDoc['markdown'],
      },
    );
  }

  async delete(id: string): Promise<Course> {
    return this.courseModel.findByIdAndDelete(id);
  }

  async findNextCourse(id: string): Promise<Course> {
    const course = this.courseModel.findById(id);
    return this.courseModel.findOne({ previousCourse: (await course)._id });
  }
}
