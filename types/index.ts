export type Course = {
  id: number
  name: string
  description: string
  content: CourseContent
  previousCourseProgress?: string | null
  completed: boolean
}

export type CreateCourseRequest = {
  name: string
  description: string
  markdown: string
}

export type UpdateCourseRequest = {
  completed: boolean
}

export type ResetCoursesResponse = Course[]

export type UserProgress = {
  userId: string
  courseId: string
  previousCourseProgress?: string
  completed: boolean
}

export type CreateUserProgressRequest = {
  courseId: string
}

export type CourseContent = {
  markdown: string
  course: string
}

export type UserProfile = {
  address: string
  role: string
}
