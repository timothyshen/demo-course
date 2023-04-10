import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserProgress, UserProgressDocument } from './user-progress.schema';

@Injectable()
export class UserProgressService {
  constructor(
    @InjectModel(UserProgress.name)
    private userModel: Model<UserProgressDocument>,
  ) {}

  async create(
    courseId: Types.ObjectId,
    userId: string,
  ): Promise<UserProgress> {
    const createdUserProgress = new this.userModel({
      courseId,
      userId,
      completed: false,
    });

    return createdUserProgress.save();
  }

  async findByUserId(userId: string): Promise<UserProgress[]> {
    return this.userModel.find({ userId }).lean().exec();
  }

  async updateCourseStatus(
    userId: string,
    courseId: string,
    completed: boolean,
  ): Promise<UserProgress> {
    return this.userModel.findOneAndUpdate(
      { userId, courseId }, // query to find the document to update
      { completed }, // updates to apply
      { new: true }, // options
    );
  }
}
