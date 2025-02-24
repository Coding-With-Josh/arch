import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const EditorSandbox = dynamic(
  () => import('./sandbox'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    )
  }
)

export const metadata = {
  dynamic: 'force-dynamic'
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    }>
      <EditorSandbox />
    </Suspense>
  )
}
