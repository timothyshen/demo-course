import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useCourseStore } from "@/store/course"

const CourseDetail: React.FC = () => {
  const route = useRouter()
  const { courses } = useCourseStore()

  const handleEdit = (id: string) => {
    route.push(`/dashboard/${id}`)
  }

  return (
    <div className="w-1/2 mx-auto">
      <Link className="text-blue-500 cursor-pointer" href="/">
        back
      </Link>
      <h1>Course Detail</h1>
      {courses.map((course, index) => (
        <div key={index}>
          <div>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
          </div>
          <div>
            <button
              onClick={() => {
                handleEdit(course._id)
              }}
              className="px-4 py-2 m-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              edit
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseDetail
