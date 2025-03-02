import { Menu, Star } from "lucide-react"
import { Button } from "../ui/button"

interface EditorCardProps {
    title: string
    description: string
    language: string
    lastEdited: string
  }
  
  export function EditorCard({
    title,
    description,
    language,
    lastEdited,
  }: EditorCardProps) {
    return (
      <div className="group relative overflow-hidden rounded-xl bg-zinc-900 p-6 transition-all hover:bg-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
          <div className="flex gap-2">
            <Button className="rounded-md bg-zinc-800 p-2 opacity-0 transition-opacity hover:bg-zinc-700 group-hover:opacity-100">
              <Star className="h-4 w-4 text-zinc-400" />
            </Button>
            <Button className="rounded-md bg-zinc-800 p-2 opacity-0 transition-opacity hover:bg-zinc-700 group-hover:opacity-100">
              <Menu className="h-4 w-4 text-zinc-400" />
            </Button>
          </div>
        </div>
        
        <p className="mt-2 text-sm text-zinc-400">{description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
              {language}
            </div>
            <span className="text-xs text-zinc-500">Last edited {lastEdited}</span>
          </div>
        </div>
      </div>
    )
  }