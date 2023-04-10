export type Course = {
  id: number
  name: string
  description: string
  content: CourseContent
  completed: boolean
}

export type UpdateCourseRequest = {
  completed: boolean
}

export type ResetCoursesResponse = Course[]

export type UserProgress = {
  userId: string
  courseId: string
  completed: boolean
}

export type CreateUserProgressRequest = {
  courseId: string
}

export type CourseContent = {
  markdown: string
  course: string
}
