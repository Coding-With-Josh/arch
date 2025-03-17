import { ElementProvider } from "@/components/web-editor/element-provider"
import { WebEditor } from "@/components/web-editor/web-editor"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Arch Editor - Professional Web Builder",
  description: "Build professional websites and applications without code",
}

export default function EditorPage() {
  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100">
      <ElementProvider>
       <WebEditor/>
      </ElementProvider>
    </div>
  )
}