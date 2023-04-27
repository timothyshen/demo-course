import React, { useState, useEffect } from "react"
import ProgressSVG from "./ProgressSVG"
import { createUserProgress, getAllCourse, getUserProgress } from "@/api"
import { Course } from "@/types"
import ConnectWalletButton from "./ConnectWallet"
import { useRouter } from "next/router"
import { useAccountStore } from "@/store/account"
import { useCourseStore } from "@/store/course"
import { useUserProgressStore } from "@/store/userprogress"
import CourseList from "./CourseDisplay"
import { add } from "husky"

const CourseDetail: React.FC = () => {
  const route = useRouter()
  const { address, role } = useAccountStore()
  const { courses, setCourses } = useCourseStore()
  const { progressCount, setUserProgressCount } = useUserProgressStore()
  const [error, setError] = useState<Error | null>(null)

  const getAllCourses = async () => {
    try {
      const courses = await getAllCourse()
      setCourses(courses)
    } catch (error) {
      setError(error as Error)
    }
  }

  const initUserProgress = async (id: string) => {
    try {
      const progress = await getUserProgress(id)
      const courseWithProgress = await courses.map((course, index) => {
        const userCourse = progress.find((item) => item.courseId === course._id)
        if (!userCourse) {
          createUserProgress(id, course._id)
        }
        if (userCourse?.completed) {
          return {
            ...course,
            completed: true,
            previousCourseProgress: userCourse?.previousCourseProgress,
          }
        } else {
          return { ...course, completed: false }
        }
      })
      await setCourses(courseWithProgress)
    } catch (error) {
      console.error(error)
      setError(error as Error)
    }
  }

  useEffect(() => {
    getAllCourses()
  }, [])

  useEffect(() => {
    if (courses) {
      const completedCount = courses.filter(
        (course: Course) => course.completed,
      ).length
      setUserProgressCount(completedCount)
    }
  }, [courses])

  useEffect(() => {
    if (address) {
      initUserProgress(address)
    }
  }, [address])

  return (
    <div className="text-center mx-auto w-2/3 h-1/2 mb-10">
      <main className="mx-auto w-2/3">
        <h1>BNB tutorial</h1>
        {!address ? (
          <ConnectWalletButton />
        ) : (
          <p>
            Wallet address: {address} <br></br> Role: {role}
          </p>
        )}
        {role == "admin" && (
          <button
            onClick={() => {
              route.push("/dashboard")
            }}
            className="px-4 py-2 my-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Dashboard
          </button>
        )}
        <CourseList courses={courses} address={address} />
      </main>
    </div>
  )
}

export default CourseDetail
