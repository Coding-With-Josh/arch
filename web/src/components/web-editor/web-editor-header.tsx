"use client"

import Link from "next/link"
import { Save, Undo, Redo, Settings, Play, Code, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WebEditorHeaderProps {
  onSwitchToFlowBuilder: () => void
}

export function WebEditorHeader({ onSwitchToFlowBuilder }: WebEditorHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary-foreground"
            >
              <path d="M12 5v14" />
              <path d="M18 13l-6 6" />
              <path d="M6 13l6 6" />
              <path d="M18 11l-6-6" />
              <path d="M6 11l6-6" />
            </svg>
          </div>
          <span className="text-xl font-bold text-zinc-100">WebFlow</span>
        </Link>

        <div className="ml-4 flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:text-zinc-100">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:text-zinc-100">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onSwitchToFlowBuilder}
          className="border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
        >
          <Code className="mr-2 h-4 w-4" />
          Switch to Flow Builder
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:text-zinc-100">
                <Play className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Preview</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:text-zinc-100">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
        >
          <Share className="h-4 w-4" />
          Share
        </Button>

        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
    </header>
  )
}

