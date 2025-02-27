import dynamic from 'next/dynamic'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arch Studio - Code Editor',
  description: 'Online code editor and development environment'
} 

const LoadingSpinner = () => (
  <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
  </div>
)

// Update the import path to point directly to sandbox.tsx
const EditorSandbox = dynamic(
  () => import('./sandbox'),
  {
    loading: LoadingSpinner,
    ssr: false
  }
)

export default function EditorPage() {
  return (
    <div className="w-full h-screen">
      <EditorSandbox />
    </div>
  )
}
