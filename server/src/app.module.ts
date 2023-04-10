import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { UserProgressModule } from './UserProgress/user-progress.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'nest-course',
    }),
    CourseModule,
    UserProgressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
