import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from "next/dynamic"
import { createCourse } from "@/api"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

const CourseDetail: React.FC = () => {
  const route = useRouter()
  const [course, setCourse] = useState<any>()
  const [courseName, setCourseName] = useState<string>("")
  const [courseDescription, setCourseDescription] = useState<string>("")

  const handleCreation = async () => {
    console.log("create")
    console.log({
      name: courseName,
      description: courseDescription,
      markdown: course,
    })

    const result = await createCourse(courseName, courseDescription, course)
    console.log(result)
    alert("Create success")
    route.push("/dashboard")
  }

  return (
    <div className="w-1/2 mx-auto">
      <Link className="text-blue-500 cursor-pointer" href="/">
        back
      </Link>
      <h1>Course Create</h1>

      <p className="mb-2">Course Title</p>
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="w-full p-1 mb-5 border border-gray-300 rounded-md"
      />
      <p className="mb-2">Course Description</p>
      <input
        type="text"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
        className="w-full p-1 mb-5 border border-gray-300 rounded-md"
      />
      <p className="mb-2">Course Description</p>
      <MDEditor value={course} onChange={setCourse} />
      <button
        onClick={handleCreation}
        className="px-4 py-2 my-4 text-white bg-gray-600 rounded-md hover:bg-gray-700"
      >
        Create
      </button>
    </div>
  )
}

export default CourseDetail
