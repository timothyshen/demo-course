import React, { useState, useEffect } from "react"
import ProgressSVG from "./ProgressSVG"
import { createUserProgress, getAllCourse, getUserProgress } from "@/api"
import { Course } from "@/types"
import ConnectWalletButton from "./ConnectWallet"
import { useRouter } from "next/router"
import { useAccountStore } from "@/store/account"
import { useCourseStore } from "@/store/course"
import { useUserProgressStore } from "@/store/userprogress"

const CourseDetail: React.FC = () => {
  const route = useRouter()
  const { address, role } = useAccountStore()
  const { courses, fetchCourses } = useCourseStore()
  const { progressCount, setUserProgressCount } = useUserProgressStore()
  const [error, setError] = useState<Error | null>(null)

  const getAllCourses = async () => {
    try {
      const courses = await getAllCourse()
      fetchCourses(courses)
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
      await fetchCourses(courseWithProgress)
    } catch (error) {
      console.error(error)
      setError(error as Error)
    }
  }

  const handleCourseStatus: React.FC<Course> = (
    item: Course,
    index: number,
  ) => {
    if (index === 0) {
      // Always show the first item as complete
      if (item.completed) {
        return (
          <button className="bg-green-500 text-white rounded-md px-2 m-2 w-[100px]">
            Complete
          </button>
        )
      }
      return (
        <button className="bg-gray-500 text-white rounded-md px-2 m-2 w-[100px]">
          Not Read
        </button>
      )
    }

    if (item.completed) {
      // Show the item as complete if it has been completed
      return (
        <button className="bg-green-500 text-white rounded-md px-2 m-2 w-[100px]">
          Complete
        </button>
      )
    }

    const previousCourseProgress = courses[index - 1]
    if (!previousCourseProgress.completed) {
      // Show the item as locked if there is no previous course progress
      return (
        <button className="bg-red-500 text-white rounded-md px-2 m-2 w-[100px]">
          Locked
        </button>
      )
    }
    // Show the item as unread if the previous course has been completed but this one has not
    return (
      <button className="bg-gray-500 text-white rounded-md px-2 m-2 w-[100px]">
        Not Read
      </button>
    )
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
    <div className="text-center mx-auto w-2/3 h-1/2">
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

        <section className="text-left border rounded-t-lg mt-3">
          <div className="bg-gray-200 px-3 flex justify-between items-center rounded-t-lg h-[60px]">
            <h3>Section 1: BNB Chain</h3>
            {address && (
              <ProgressSVG
                radius={30}
                stroke={4}
                progress={progressCount}
                courseTotal={courses.length}
              />
            )}
          </div>
          {courses.map((item, index) => {
            return (
              <div
                key={index}
                className="p-3 flex justify-between align-middle"
              >
                <div className="w-[100%]">
                  <h4
                    onClick={() => {
                      if (!address) return alert("Please connect wallet")
                      if (index !== 0 && !courses[index - 1].completed)
                        return alert("Please complete previous course")
                      route.push({
                        pathname: `/course/${item._id}`,
                      })
                    }}
                    className="text-lg w-full"
                  >
                    {item.name}
                  </h4>
                  <p className="text-sm">{item.description}</p>
                </div>
                {address && handleCourseStatus(item, index)}
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default CourseDetail
