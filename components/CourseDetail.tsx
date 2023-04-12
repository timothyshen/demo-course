import React, { useState, useEffect } from "react"
import ProgressSVG from "./ProgressSVG"
import {
  createUserProgress,
  getAllCourse,
  getUserProgress,
  getProfile,
} from "@/api"
import { Course } from "@/types"
import ConnectWalletButton from "./ConnectWallet"
import { useRouter } from "next/router"
import { useAccountStore } from "@/store/account"
import { useCourseStore } from "@/store/course"

const CourseDetail: React.FC = () => {
  const route = useRouter()
  const { address, role } = useAccountStore()
  const { courses, loading, fetchCourses } = useCourseStore()
  const [progress, setProgress] = useState<number>(0)
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
          return { ...course, completed: true }
        } else {
          return { ...course, completed: false }
        }
      })
      fetchCourses(courseWithProgress)
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
      setProgress(completedCount)
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
                progress={progress}
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
                <div>
                  <h4
                    onClick={() => {
                      if (!address) return alert("Please connect wallet")
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
                {address && (
                  <div className="my-auto">
                    {item.completed ? (
                      <button className="bg-green-500 text-black rounded-md px-2 m-2 w-max">
                        Complete
                      </button>
                    ) : (
                      <button className="bg-gray-500 text-white rounded-md px-2 m-2 w-max">
                        Not Read
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default CourseDetail
