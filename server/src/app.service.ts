import { Injectable } from '@nestjs/common';
import Courses from './courses.json';

@Injectable()
export class CourseService {
  updateAllCoursesComplete() {
    Courses.forEach((course) => {
      course.completed = false;
    });
  }

  updateCourseComplete(id: number, completed: boolean) {
    const course = Courses.find((course) => course.id === id);
    course.completed = completed;
  }
}
