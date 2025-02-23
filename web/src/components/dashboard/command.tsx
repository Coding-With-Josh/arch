"use client"

import * as React from "react"
import { Command } from "cmdk"
import { AnimatePresence, motion } from "framer-motion"
import { 
  Search, 
  FileIcon, 
  Terminal, 
  Wallet,
  Bot
} from "lucide-react"

export function CommandCenter() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <motion.div 
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Command Menu */}
          <motion.div 
            className="fixed left-[50%] top-[20%] w-full max-w-[640px] -translate-x-[50%]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <Command
              className="relative rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl"
              loop
            >
              <div className="flex items-center border-b border-zinc-800 px-3">
                <Search className="h-4 w-4 text-zinc-500" />
                <Command.Input 
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent py-3 px-2 text-sm outline-none placeholder:text-zinc-500 text-zinc-50"
                />
              </div>

              <Command.List className="max-h-[400px] overflow-auto p-2 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-800">
                <Command.Group heading="General">
                  <Command.Item
                    onSelect={() => runCommand(() => console.log("New File"))}
                    className="group relative flex items-center rounded-lg px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                  >
                    <FileIcon className="mr-2 h-4 w-4 text-zinc-500" />
                    <span>New File</span>
                    <kbd className="pointer-events-none absolute right-2 top-[50%] -translate-y-[50%] bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400 opacity-100 group-hover:opacity-70">⌘N</kbd>
                  </Command.Item>
                  {/* Add more general commands */}
                </Command.Group>

                <Command.Group heading="Tools">
                  <Command.Item 
                    onSelect={() => runCommand(() => console.log("Open Terminal"))}
                    className="group relative flex items-center rounded-lg px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                  >
                    <Terminal className="mr-2 h-4 w-4 text-zinc-500" />
                    <span>Open Terminal</span>
                    <kbd className="pointer-events-none absolute right-2 top-[50%] -translate-y-[50%] bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400 opacity-100 group-hover:opacity-70">⌘T</kbd>
                  </Command.Item>
                  {/* Add more tool commands */}
                </Command.Group>

                <Command.Group heading="Web3">
                  <Command.Item
                    onSelect={() => runCommand(() => console.log("Deploy Contract"))}
                    className="group relative flex items-center rounded-lg px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                  >
                    <Wallet className="mr-2 h-4 w-4 text-zinc-500" />
                    <span>Deploy Contract</span>
                  </Command.Item>
                  {/* Add more Web3 commands */}
                </Command.Group>

                <Command.Group heading="AI Assistant">
                  <Command.Item
                    onSelect={() => runCommand(() => console.log("Generate Code"))}
                    className="group relative flex items-center rounded-lg px-2 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                  >
                    <Bot className="mr-2 h-4 w-4 text-zinc-500" />
                    <span>Generate Code</span>
                  </Command.Item>
                  {/* Add more AI commands */}
                </Command.Group>
              </Command.List>

              <div className="border-t border-zinc-800 p-2">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Search commands...</span>
                  <span>⌘K to toggle</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}