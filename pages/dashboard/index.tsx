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
      <div className="flex justify-between">
        <h1>Course Detail</h1>
        <button
          onClick={() => {
            route.push("/dashboard/create")
          }}
          className="px-4 py-2 m-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          + Create
        </button>
      </div>

      {courses.map((course, index) => (
        <div className="bg-gray-100 rounded-lg p-4 my-4" key={index}>
          <div>
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p className="text-gray-600">{course.description}</p>
          </div>
          <div>
            <button
              onClick={() => {
                handleEdit(course._id)
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseDetail
