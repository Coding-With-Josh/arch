import dynamic from 'next/dynamic'

// Dynamically import the Sandbox component with no SSR
const Sandbox = dynamic(() => import('./sandbox'), { 
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
    </div>
  )
})

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default function Page() {
  return <Sandbox />
}
