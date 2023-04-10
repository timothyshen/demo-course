import React, { useState, useEffect } from 'react'
import { getCourseById, updateUserProgress } from '@/api'
import { useRouter } from 'next/router'
import { Course } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export default function CourseDetail() {
  const [courseContent, setCourseContent] = useState<string>('')
  const route = useRouter()

  const getCourse = async () => {
    const courseId = route.query.id
    if (courseId) {
      const course = await getCourseById(courseId as string)
      setCourseContent(course.content.markdown)
      console.log(course)
    }
  }

  const handleComplete = async () => {
    const { walletAddress, id } = route.query
    if (walletAddress && id) {
      await updateUserProgress(walletAddress as string, id as string, true)
      alert('Completed')
      window.scrollTo(0, 0)
    }
  }
  useEffect(() => {
    getCourse()
  }, [route.query.id])

  if (route.isFallback) {
    return <div>Loading...</div>
  }
  return (
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
          className="w-auto bg-gray-200 border-spacing-x-1 rounded-md p-2 mt-4"
          onClick={handleComplete}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
