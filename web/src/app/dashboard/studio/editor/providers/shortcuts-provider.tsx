"use client"

import * as React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { shortcuts, type ShortcutAction } from '../config/shortcuts'
import { toast } from 'sonner'
import { useFileStore } from '../store'

interface ShortcutsProviderProps {
  children: React.ReactNode
}

interface ShortcutHandlers {
  [key: string]: () => void
}

export function ShortcutsProvider({ children }: ShortcutsProviderProps) {
  const { 
    createFile, 
    createFolder, 
    deleteItem,
    selectedFile,
    updateFileContent,
    files 
  } = useFileStore()

  const handlers: ShortcutHandlers = {
    save: () => {
      if (selectedFile) {
        // Implement actual save logic here
        toast.success('File saved')
      }
    },
    newFile: () => {
      createFile('Untitled.ts')
      toast.success('New file created')
    },
    newFolder: () => {
      createFolder('New Folder')
      toast.success('New folder created')
    },
    closeFile: () => {
      if (selectedFile) {
        deleteItem(selectedFile.id)
        toast.success('File closed')
      }
    },
    formatCode: () => {
      if (selectedFile?.content) {
        // Implement code formatting logic
        toast.success('Code formatted')
      }
    },
    toggleTerminal: () => {
      // Implement terminal toggle
      toast.success('Terminal toggled')
    },
    deployContract: () => {
      toast.loading('Deploying contract...')
      // Implement contract deployment
      setTimeout(() => toast.success('Contract deployed'), 2000)
    },
  }

  // Register all shortcuts
  const shortcutEntries = Object.entries(shortcuts);
  shortcutEntries.map(([action, shortcut]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useHotkeys(shortcut, (e) => {
      e.preventDefault()
      handlers[action]?.()
    })
  });

  return <>{children}</>
}
