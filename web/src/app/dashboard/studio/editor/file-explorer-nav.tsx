"use client"

import * as React from "react"
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react"

import { cn } from "@/lib/utils"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  path?: string
  items?: FileItem[]
}

interface FileExplorerNavProps {
  items: FileItem[]
}

export function FileExplorerNav({ items }: FileExplorerNavProps) {
  const [openFolders, setOpenFolders] = React.useState<Record<string, boolean>>({})

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const renderItem = (item: FileItem, level = 0) => {
    const isOpen = openFolders[item.id]
    const hasItems = item.items && item.items.length > 0

    return (
      <div key={item.id} className="relative">
        <button
          onClick={() => hasItems && toggleFolder(item.id)}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-400 transition-colors hover:bg-white/5",
            isOpen && "text-white",
          )}
          style={{ paddingLeft: `${(level + 1) * 12}px` }}
        >
          {hasItems ? (
            <span className="flex items-center gap-2">
              <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-90")} />
              {isOpen ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
            </span>
          ) : (
            <File className="ml-5.5 h-4 w-4" />
          )}
          <span>{item.name}</span>
          {item.path && <span className="ml-auto text-xs text-gray-500">{item.path}</span>}
        </button>
        {hasItems && isOpen && (
          <div className="relative">{item.items!.map((subItem) => renderItem(subItem, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="w-72 overflow-hidden rounded-xl border h-full border-white/10 bg-black/40 p-2 backdrop-blur-xl">
      <div className="space-y-0.5">{items.map((item) => renderItem(item))}</div>
    </div>
  )
}

