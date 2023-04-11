import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getCourseById, updateCourse } from "@/api"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from "next/dynamic"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

const CourseEditPage: React.FC = () => {
  const route = useRouter()
  const { id } = route.query
  const [course, setCourse] = useState<any>()

  const getCourse = async () => {
    try {
      const course = await getCourseById(id as string)
      setCourse(course.content.markdown)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async () => {
    try {
      await updateCourse(id as string, course)
      alert("Update success")
      getCourse()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCourse()
  }, [])

  return (
    <>
      <div className="w-1/2 mx-auto">
        <h1>Course Edit</h1>
        <MDEditor value={course} onChange={setCourse} />
        <button
          onClick={handleUpdate}
          className="px-4 py-2 m-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
        >
          Update
        </button>
      </div>
    </>
  )
}

export default CourseEditPage
