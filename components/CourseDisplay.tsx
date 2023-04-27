import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import ProgressSVG from "./ProgressSVG"
import { Course } from "@/types"
import PopUp from "./popup"

interface Props {
  courses: Course[]
  address: string
}

const CourseList: React.FC<Props> = ({ courses, address }: Props) => {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)

  const handleCourseStatus: React.FC<Course> = (
    item: Course,
    sectionCourses: Course[],
  ) => {
    const previousCourse = sectionCourses.find(
      (course) => course._id === item.previousCourse,
    )

    console.log("previousCourse", previousCourse)
    if (previousCourse === undefined) {
      // Always show the first item as complete
      return item.completed ? (
        <button className="bg-green-500 text-white rounded-md px-2 my-auto mx-2 w-[100px] h-[32px]">
          Complete
        </button>
      ) : (
        <button className="bg-gray-500 text-white rounded-md px-2 my-auto mx-2 w-[100px] h-[32px]">
          Not Read
        </button>
      )
    } else {
      return item.completed ? (
        <button className="bg-green-500 text-white rounded-md px-2 my-auto mx-2 w-[100px] h-[32px]">
          Complete
        </button>
      ) : previousCourse.completed ? (
        <button className="bg-gray-500 text-white rounded-md px-2 my-auto mx-2 w-[100px] h-[32px]">
          Not Read
        </button>
      ) : (
        <button className="bg-red-500 text-white rounded-md px-2 my-auto mx-2 w-[100px] h-[32px]">
          Locked
        </button>
      )
    }
  }

  const navigateToCourse = (item: Course, sectionCourses: Course[]) => {
    const previousCourse = sectionCourses.find(
      (course) => course._id === item.previousCourse,
    )
    if (!address) {
      alert("Please connect wallet")
      return
    }
    if (previousCourse && !previousCourse.completed) {
      alert("Please complete previous course")
      return
    }
    router.push({
      pathname: `/course/${item._id}`,
    })
  }

  const sections = courses.reduce<{ [key: string]: Course[] }>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = []
    acc[item.section].push(item)
    return acc
  }, {})

  return (
    <>
      {Object.entries(sections).map(([sectionName, sectionCourses], index) => (
        <section
          key={sectionName}
          className="text-left border rounded-t-lg mt-3"
        >
          <div className="bg-gray-200 px-3 flex justify-between items-center rounded-t-lg h-[60px]">
            <h3>
              Section {index + 1}: {sectionName}
            </h3>
            {address && (
              <ProgressSVG
                radius={30}
                stroke={4}
                progress={
                  sectionCourses.filter((item) => item.completed).length
                }
                courseTotal={sectionCourses.length}
              />
            )}
          </div>
          {sectionCourses.map((item, index) => (
            <div
              key={item._id}
              className="p-3 flex justify-between align-middle"
            >
              <div className="w-[100%]">
                <h4
                  onClick={() => navigateToCourse(item, sectionCourses)}
                  className="text-lg w-full cursor-pointer"
                >
                  {item.name}
                </h4>
                <p className="text-sm">{item.description}</p>
              </div>
              {address && handleCourseStatus(item, sectionCourses)}
            </div>
          ))}
        </section>
      ))}
    </>
  )
}

export default CourseList
