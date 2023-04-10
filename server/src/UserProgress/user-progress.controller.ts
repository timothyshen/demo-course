import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { CreateUserProgressDto } from './create-user-progress.dto';
import { UserProgress } from './user-progress.schema';
import { UpdateUserProgressDto } from './update-user-progress.dto';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Post()
  async create(
    @Body() createUserProgressDto: CreateUserProgressDto,
  ): Promise<UserProgress> {
    return this.userProgressService.create(
      createUserProgressDto.courseId,
      createUserProgressDto.userId,
    );
  }

  @Get(':userId')
  async findByUserId(@Param('userId') userId: string): Promise<UserProgress[]> {
    return this.userProgressService.findByUserId(userId);
  }

  @Put()
  async updateCourseStatus(
    @Body() updateUserProgressDto: UpdateUserProgressDto,
  ): Promise<UserProgress> {
    return this.userProgressService.updateCourseStatus(
      updateUserProgressDto.userId,
      updateUserProgressDto.courseId,
      updateUserProgressDto.completed,
    );
  }
}
