"use client"

import * as React from "react"
import { ChevronRight, File, Folder, FolderOpen, Plus, Search, Trash2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FileItem } from "./store"

interface FileExplorerNavProps {
  items: FileItem[]
  selectedFile: FileItem | null
  onFileSelect: (file: FileItem) => void
  onCreateFile: (name: string, parentId?: string) => void
  onCreateFolder: (name: string, parentId?: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, newName: string) => void
}

export function FileExplorerNav({
  items,
  selectedFile,
  onFileSelect,
  onCreateFile,
  onCreateFolder,
  onDelete,
  onRename
}: FileExplorerNavProps) {
  const [openFolders, setOpenFolders] = React.useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = React.useState("")
  const [contextMenu, setContextMenu] = React.useState<{
    x: number
    y: number
    item: FileItem
  } | null>(null)

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleContextMenu = (e: React.MouseEvent, item: FileItem) => {
    e.preventDefault()
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item,
    })
  }

  const closeContextMenu = () => setContextMenu(null)

  const handleCreateFile = (parentId?: string) => {
    const name = window.prompt("Enter file name:")
    if (name) {
      onCreateFile(name, parentId)
    }
    closeContextMenu()
  }

  const handleCreateFolder = (parentId?: string) => {
    const name = window.prompt("Enter folder name:")
    if (name) {
      onCreateFolder(name, parentId)
    }
    closeContextMenu()
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete(id)
    }
    closeContextMenu()
  }

  const handleRename = (id: string) => {
    const item = findItemById(items, id)
    if (!item) return
    
    const newName = window.prompt("Enter new name:", item.name)
    if (newName && newName !== item.name) {
      onRename(id, newName)
    }
    closeContextMenu()
  }

  React.useEffect(() => {
    document.addEventListener("click", closeContextMenu)
    return () => document.removeEventListener("click", closeContextMenu)
  }, [])

  const renderItem = (item: FileItem, level = 0) => {
    const isOpen = openFolders[item.id]
    const hasItems = item.items && item.items.length > 0

    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      if (!hasItems) return null
      const filteredChildren = item.items!
        .map((subItem) => renderItem(subItem, level + 1))
        .filter(Boolean)
      if (!filteredChildren.length) return null
    }

    return (
      <div key={item.id} className="relative">
        <button
          onClick={() => {
            if (hasItems) {
              toggleFolder(item.id)
            } else {
              onFileSelect?.(item)
            }
          }}
          onContextMenu={(e) => handleContextMenu(e, item)}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-400 transition-colors hover:bg-white/5",
            isOpen && "text-white",
          )}
          style={{ paddingLeft: `${(level + 1) * 12}px` }}
        >
          {hasItems ? (
            <span className="flex items-center gap-2">
              <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-90")} />
              {isOpen ? <FolderOpen className="h-4 w-4 text-yellow-500" /> : <Folder className="h-4 w-4 text-yellow-500" />}
            </span>
          ) : (
            <File className="ml-5.5 h-4 w-4 text-blue-500" />
          )}
          <span>{item.name}</span>
          {/* {item.lastModified && (
            <span className="ml-auto text-xs text-gray-500">
              {item.lastModified.toLocaleDateString()}
            </span>
          )} */}
        </button>
        {hasItems && isOpen && (
          <div className="relative">
            {item.items!.map((subItem) => renderItem(subItem, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-[32rem] overflow-hidden rounded-xl border min-h-screen border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-zinc-500 text-xs font-semibold uppercase">File Explorer</h2>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-zinc-900/50"
          />
        </div>
      </div>

      <div className="space-y-0.5 p-2">
        {items.map((item) => renderItem(item))}
      </div>

      {contextMenu && (
        <div
          className="fixed z-50 min-w-[160px] rounded-lg border border-white/10 bg-zinc-900 py-1 shadow-md"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            onClick={() => handleCreateFile(contextMenu.item.id)}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:bg-white/5"
          >
            <Plus className="h-4 w-4" />
            New File
          </button>
          <button
            onClick={() => handleCreateFolder(contextMenu.item.id)}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:bg-white/5"
          >
            <Folder className="h-4 w-4" />
            New Folder
          </button>
          <hr className="my-1 border-white/10" />
          <button
            onClick={() => handleDelete(contextMenu.item.id)}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:bg-white/5"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

// Helper function to find item by ID
function findItemById(items: FileItem[], id: string): FileItem | null {
  for (const item of items) {
    if (item.id === id) return item
    if (item.items) {
      const found = findItemById(item.items, id)
      if (found) return found
    }
  }
  return null
}