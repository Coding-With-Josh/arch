import type { Metadata } from "next"
import { EditorWorkspace } from "@/components/editor/editor-workspace"
import { ElementProvider } from "@/components/editor/element-provider"

export const metadata: Metadata = {
  title: "Arch Editor - Professional Web Builder",
  description: "Build professional websites and applications without code",
}

export default function EditorPage() {
  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100">
      <ElementProvider>
        <EditorWorkspace />
      </ElementProvider>
    </div>
  )
}