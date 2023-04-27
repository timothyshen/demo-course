import React, { useState, useEffect } from "react"
import { getCourseById, updateUserProgress, checkCourseStatus } from "@/api"
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { useAccountStore } from "@/store/account"
import PopUp from "@/components/popup"

export default function CourseDetail() {
  const { address } = useAccountStore()
  const [courseContent, setCourseContent] = useState<string>("")
  const [completed, setCompleted] = useState<boolean>(false)
  const [progress, setProgress] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const route = useRouter()

  const getCourse = async () => {
    const courseId = route.query.id
    if (courseId) {
      const course = await getCourseById(courseId as string)
      setCourseContent(course.content.markdown)
    }
  }

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrolled = (scrollTop / height) * 100
      setProgress(scrolled)
      if (scrolled === 100) {
        handleComplete()
      }
    }
    window.addEventListener("scroll", calculateProgress)
    return () => {
      window.removeEventListener("scroll", calculateProgress)
    }
  }, [])

  const handleComplete = async () => {
    const { id } = route.query
    if (address && id) {
      await updateUserProgress(address as string, id as string, true)
      setShowPopup(true)
    }
  }

  const checkCourse = async () => {
    const { id } = route.query
    if (address && id) {
      const status = await checkCourseStatus(address as string, id as string)
      setCompleted(status.completed)
    }
  }

  useEffect(() => {
    getCourse()
  }, [route.query.id])

  useEffect(() => {
    checkCourse()
  }, [])

  if (route.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className="bg-gray-200 h-2 fixed top-0 left-0 w-full z-50">
        <div
          className="bg-blue-500 h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {showPopup && (
        <PopUp
          title="Congratulations!"
          content="You have completed this course!"
          onClose={() => {
            setShowPopup(false)
          }}
        />
      )}

      <div className="mx-auto w-2/3 h-1/2 my-10">
        <Link className="text-blue-500 cursor-pointer" href="/">
          back
        </Link>
        <ReactMarkdown
          className="justify-left"
          children={courseContent}
          remarkPlugins={[remarkGfm]}
        />
        <div className="flex flex-col justify-between items-center">
          <button
            className="w-auto bg-gray-200 border-spacing-x-1 rounded-md p-2 mt-4 hover:bg-gray-400"
            onClick={() => {
              route.push("/")
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  )
}
