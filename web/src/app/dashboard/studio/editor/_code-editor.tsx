"use client"

import * as React from "react"
import { ShortcutsProvider } from "./providers/shortcuts-provider"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { FileExplorerNav } from "./file-explorer-nav"
import { AI } from "./ai"
import { CodeArea } from "./code-area"
import { useHotkeys } from "react-hotkeys-hook"
import { toast } from "sonner"
import { FileItem, useFileStore } from "./store"

const fileStructure = [
  {
    id: "app",
    name: "app",
    type: "folder",
    items: [
      {
        id: "layout",
        name: "layout.js",
        type: "file",
      },
      {
        id: "marketing",
        name: "(marketing)",
        type: "folder",
        items: [
          {
            id: "about",
            name: "about",
            type: "folder",
            path: "/about",
            items: [
              {
                id: "about-page",
                name: "page.js",
                type: "file",
              },
            ],
          },
          {
            id: "blog",
            name: "blog",
            type: "folder",
            path: "/blog",
            items: [
              {
                id: "blog-page",
                name: "page.js",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        id: "shop",
        name: "(shop)",
        type: "folder",
        items: [
          {
            id: "account",
            name: "account",
            type: "folder",
            path: "/account",
            items: [
              {
                id: "account-page",
                name: "page.js",
                type: "file",
              },
            ],
          },
        ],
      },
    ],
  },
]

export default function CodeEditor() {
  const {
    files,
    createFile,
    createFolder,
    deleteItem,
    renameItem,
    selectedFile,
    setSelectedFile,
    updateFileContent,
  } = useFileStore()

  React.useEffect(() => {
    // Auto-select first file when component mounts
    if (files.length > 0 && !selectedFile) {
      const firstFile = findFirstFile(files)
      if (firstFile) {
        setSelectedFile(firstFile)
      }
    }
  }, [files, selectedFile, setSelectedFile])

  // Keyboard shortcuts
  useHotkeys('ctrl+s', (e: any) => {
    e.preventDefault()
    toast.success('File saved')
  })

  useHotkeys('ctrl+n', (e: any) => {
    e.preventDefault()
    createFile('New File')
  })

  useHotkeys('ctrl+shift+n', (e: any) => {
    e.preventDefault()
    createFolder('New Folder')
  })

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file)
  }

  const handleFileUpdate = (content: string) => {
    if (selectedFile) {
      updateFileContent(selectedFile.id, content)
    }
  }

  return (
    <ShortcutsProvider>
      <div className="h-[calc(100vh-4rem)] w-full overflow-hidden bg-zinc-950">
        <ResizablePanelGroup direction="horizontal">
          {/* File Explorer */}
          <ResizablePanel 
            defaultSize={20} 
            minSize={15} 
            maxSize={30}
            className="min-w-[250px] max-w-[400px]"
          >
            <FileExplorerNav
              items={files}
              onFileSelect={handleFileSelect}
              onCreateFile={createFile}
              onCreateFolder={createFolder}
              onDelete={deleteItem}
              onRename={renameItem}
              selectedFile={selectedFile}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Code Editor */}
          <ResizablePanel defaultSize={55} minSize={30}>
            <CodeArea
              key={selectedFile?.id}
              file={selectedFile}
              onUpdate={handleFileUpdate}
              onClose={(id) => deleteItem(id)}
              onSave={() => {
                if (selectedFile) {
                  toast.success('File saved')
                }
              }}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* AI Assistant */}
          <ResizablePanel defaultSize={25} minSize={15}>
            <AI />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ShortcutsProvider>
  )
}

// Helper function to find the first file in the tree
function findFirstFile(items: FileItem[]): FileItem | null {
  for (const item of items) {
    if (item.type === 'file') {
      return item
    }
    if (item.items) {
      const found = findFirstFile(item.items)
      if (found) return found
    }
  }
  return null
}
