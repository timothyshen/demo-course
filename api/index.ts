import instance from "./axios"
import { Course, UserProgress, UserProfile } from "@/types"

export const getAllCourse = async (): Promise<Course[]> => {
  try {
    const response = await instance.get("/courses")
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCourseById = async (id: string): Promise<Course> => {
  try {
    const response = await instance.get(`/courses/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateCourse = async (
  id: string,
  markdown: string,
): Promise<Course> => {
  try {
    const response = await instance.put(`/courses/${id}`, {
      markdown,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Path:/user-progress
export const getUserProgress = async (
  userId: string,
): Promise<UserProgress[]> => {
  try {
    const response = await instance.get(`/user-progress/${userId}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createUserProgress = async (
  userId: string,
  courseId: string,
): Promise<UserProgress> => {
  try {
    const response = await instance.post("/user-progress", {
      userId,
      courseId,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateUserProgress = async (
  userId: string,
  courseId: string,
  completed: boolean,
): Promise<UserProgress> => {
  try {
    const response = await instance.put("/user-progress", {
      userId,
      courseId,
      completed,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getProfile = async (address: string): Promise<UserProfile> => {
  try {
    const response = await instance.get(`/user-profiles/${address}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const checkCourseStatus = async (
  userId: string,
  courseId: string,
): Promise<boolean> => {
  try {
    const response = await instance.get(
      `/user-progress/check-status/${userId}/${courseId}`,
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
