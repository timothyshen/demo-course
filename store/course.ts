import { create } from "zustand"
import { Course } from "@/types"

type CourseStore = {
  courses: Course[]
  error: Error | null
  loading: boolean
  setCourses: (course: Course[]) => Promise<void>
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  error: null,
  loading: false,
  setCourses: async (courses: Course[]) => {
    set({ loading: true, error: null })
    try {
      set({ courses })
    } catch (error) {
      set({ error: error as Error })
    } finally {
      set({ loading: false })
    }
  },
}))
