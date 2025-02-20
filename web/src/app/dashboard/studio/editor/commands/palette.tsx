"use client"

import * as React from "react"
import { Command } from "cmdk"
import { useHotkeys } from "react-hotkeys-hook"
import {
  File,
  FolderOpen,
  GitBranch,
  Save,
  Settings,
  Terminal,
  Upload,
  Wallet,
} from "lucide-react"

interface CommandItem {
  name: string;
  shortcut?: string;
  icon: React.ComponentType<any>;
}

interface CommandGroup {
  category: string;
  items: CommandItem[];
}

interface CommandPaletteProps {
  onCommand: (command: string, args?: any) => void
}

export function CommandPalette({ onCommand }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false)

  useHotkeys('cmd+shift+p, ctrl+shift+p', (e) => {
    e.preventDefault()
    setOpen(true)
  })

  const commands = [
    {
      category: "File",
      items: [
        { name: "New File", shortcut: "Ctrl+N", icon: File },
        { name: "Save", shortcut: "Ctrl+S", icon: Save },
        { name: "Open Folder", shortcut: "Ctrl+O", icon: FolderOpen },
      ]
    },
    {
      category: "Git",
      items: [
        { name: "Commit Changes", shortcut: "Ctrl+Shift+G", icon: GitBranch },
        { name: "Push to GitHub", shortcut: "Ctrl+Shift+P", icon: Upload },
      ]
    },
    {
      category: "Web3",
      items: [
        { name: "Connect Wallet", shortcut: "Ctrl+Alt+C", icon: Wallet },
        { name: "Deploy Contract", shortcut: "Ctrl+Alt+A", icon: Upload },
      ]
    },
    {
      category: "View",
      items: [
        { name: "Toggle Terminal", shortcut: "Ctrl+`", icon: Terminal },
        { name: "Settings", shortcut: "Ctrl+,", icon: Settings },
      ]
    }
  ]

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[640px] max-w-[90vw] rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl"
    >
      <Command.Input 
        placeholder="Type a command or search..."
        className="w-full px-4 py-3 text-sm bg-transparent border-b border-white/10 outline-none text-white/90"
      />
      
      <Command.List className="max-h-[400px] overflow-auto p-2">
        {commands.map((group) => (
          <Command.Group key={group.category} heading={group.category}>
            {group.items.map((item) => ( 
              <Command.Item
                key={item.name}
                onSelect={() => {
                  onCommand(item.name.toLowerCase().replace(/\s+/g, '-'))
                  setOpen(false)
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 rounded hover:bg-white/5"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className="flex-1">{item.name}</span>
                {item.shortcut && (
                  <span className="text-xs text-white/40">{item.shortcut}</span>
                )}
              </Command.Item>
            ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  )
}
