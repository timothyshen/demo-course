import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserProgress } from './user-progress.schema';
import { CourseService } from '../course/course.service';
@Injectable()
export class UserProgressService {
  constructor(
    @InjectModel(UserProgress.name)
    private userModel: Model<UserProgress>,
    @Inject(CourseService) private courseService: CourseService,
  ) {}

  async create(
    courseId: Types.ObjectId,
    userId: string,
  ): Promise<UserProgress> {
    const createdUserProgress = new this.userModel({
      courseId,
      userId,
      completed: false,
      previousCourseProgress: undefined,
    });

    return createdUserProgress.save();
  }

  async findByUserId(userId: string): Promise<UserProgress[]> {
    return this.userModel.find({ userId }).lean().exec();
  }

  async updateCourseStatus(
    userId: string,
    courseId: Types.ObjectId,
    completed: boolean,
  ): Promise<UserProgress> {
    // Find the most recent progress entry for the user and the course
    const progress = await this.userModel
      .findOneAndUpdate(
        { userId, courseId },
        { completed },
        { new: true, sort: { _id: -1 } },
      )
      .exec();
    // Find the most recent progress entry for the previous course, if any
    const previousCourse = await this.courseService.findById(courseId);
    // Update the progress entry with the previous entry, if any
    progress.previousCourseProgress = previousCourse.previousCourse;
    await progress.save();

    return progress;
  }

  async checkCourseStatus(
    userId: string,
    courseId: string,
  ): Promise<UserProgress | null> {
    const userProgress = await this.userModel
      .findOne({ userId, courseId })
      .lean()
      .exec();
    return userProgress;
  }
}
