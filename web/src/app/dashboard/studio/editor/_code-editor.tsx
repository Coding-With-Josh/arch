"use client"

import * as React from "react"
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
import { useFileStore } from "./store"

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
    createFile,
    createFolder,
    deleteItem,
    renameItem,
    selectedFile,
    setSelectedFile
  } = useFileStore()

  // Keyboard shortcuts
  useHotkeys('ctrl+s', (e) => {
    e.preventDefault()
    toast.success('File saved')
  })

  useHotkeys('ctrl+n', (e) => {
    e.preventDefault()
    createFile('New File')
  })

  useHotkeys('ctrl+shift+n', (e) => {
    e.preventDefault()
    createFolder('New Folder')
  })

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-zinc-950">
      <ResizablePanelGroup direction="horizontal">
        {/* File Explorer */}
        <ResizablePanel 
          defaultSize={20} 
          minSize={15} 
          maxSize={30}
          className="min-w-[250px]"
        >
          <FileExplorerNav
            onFileSelect={setSelectedFile}
            onCreateFile={createFile}
            onCreateFolder={createFolder}
            onDelete={deleteItem}
            onRename={renameItem}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Code Editor */}
        <ResizablePanel defaultSize={55} minSize={30}>
          <CodeArea
            key={selectedFile?.id}
            file={selectedFile}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* AI Assistant */}
        <ResizablePanel defaultSize={25} minSize={15}>
          <AI />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
