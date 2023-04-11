import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from "next/dynamic"
import React from "react"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

const MDEditorComponent: React.FC = ({ value, setValue }: any) => {
  return (
    <div>
      <MDEditor value={value} onChange={setValue} />
    </div>
  )
}

export default MDEditorComponent
