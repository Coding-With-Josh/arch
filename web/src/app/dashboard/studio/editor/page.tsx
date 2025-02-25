import dynamic from 'next/dynamic'
import { Metadata } from 'next'

// Static metadata configuration
export const metadata: Metadata = {
  title: 'Arch Studio - Code Editor',
  description: 'Online code editor and development environment'
} 

// Loading component
const LoadingSpinner = () => (
  <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
  </div>
)

// Dynamic import with explicit type
const EditorSandbox = dynamic(
  () => import('./components/editor-sandbox').then(mod => mod.default),
  {
    loading: LoadingSpinner,
    ssr: false
  }
)

export default function EditorPage() {
  return <EditorSandbox />
}
