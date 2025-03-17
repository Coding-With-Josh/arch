"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Zap,
  Clock,
  Filter,
  Users,
  Mail,
  MessageSquare,
  Database,
  Repeat,
  GitMerge,
  GitBranch,
  AlertTriangle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface NodePanelProps {
  selectedNode: string | null
  onSelectNode: (id: string) => void
}

export function NodePanel({ selectedNode, onSelectNode }: NodePanelProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 border-r bg-background">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search nodes..."
            className="pl-8 h-9"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <h3 className="mt-4 font-medium">Nodes Library</h3>

        <Accordion type="multiple" defaultValue={["triggers", "actions", "conditionals"]} className="w-full mt-2">
          <AccordionItem value="triggers">
            <AccordionTrigger className="text-sm py-2">
              <div className="flex items-center">
                <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                Trigger
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div
                draggable
                onDragStart={(e) => onDragStart(e, 'trigger')}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move",
                  selectedNode === "trigger" && "bg-muted",
                )}
                onClick={() => onSelectNode("trigger")}
              >
                <Zap className="h-4 w-4 text-yellow-500" />
                <div>
                  <div className="font-medium">Start Workflow</div>
                  <div className="text-xs text-muted-foreground">Trigger</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="actions">
            <AccordionTrigger className="text-sm py-2">
              <div className="flex items-center">
                <Zap className="mr-2 h-4 w-4 text-blue-500" />
                Action
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, 'action-email')}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move"
                  onClick={() => onSelectNode("action-email")}
                >
                  <Mail className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="font-medium">Send Email</div>
                    <div className="text-xs text-muted-foreground">Action</div>
                  </div>
                </div>

                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, 'action-sms')}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move"
                  onClick={() => onSelectNode("action-sms")}
                >
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="font-medium">Send SMS</div>
                    <div className="text-xs text-muted-foreground">Action</div>
                  </div>
                </div>

                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, 'action-database')}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move"
                  onClick={() => onSelectNode("action-database")}
                >
                  <Database className="h-4 w-4 text-blue-500" />
                  <div>
                    <div className="font-medium">Update Database</div>
                    <div className="text-xs text-muted-foreground">Action</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="conditionals">
            <AccordionTrigger className="text-sm py-2">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-purple-500" />
                Conditional
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, 'conditional-check')}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move",
                    selectedNode === "conditional-check" && "bg-muted",
                  )}
                  onClick={() => onSelectNode("conditional-check")}
                >
                  <Filter className="h-4 w-4 text-purple-500" />
                  <div>
                    <div className="font-medium">Check Client Source</div>
                    <div className="text-xs text-muted-foreground">Conditional</div>
                  </div>
                </div>

                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, 'conditional-user')}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move"
                  onClick={() => onSelectNode("conditional-user")}
                >
                  <Users className="h-4 w-4 text-purple-500" />
                  <div>
                    <div className="font-medium">User Condition</div>
                    <div className="text-xs text-muted-foreground">Conditional</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flow-control">
            <AccordionTrigger className="text-sm py-2">
              <div className="flex items-center">
                <GitBranch className="mr-2 h-4 w-4 text-green-500" />
                Flow Control
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, 'delay')}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move"
                  onClick={() => onSelectNode("delay")}
                >
                  <Clock className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="font-medium">Delay</div>
                    <div className="text-xs text-muted-foreground">Pause the workflow</div>
                  </div>
                </div>

                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, 'loop')}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move"
                  onClick={() => onSelectNode("loop")}
                >
                  <Repeat className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="font-medium">Loop</div>
                    <div className="text-xs text-muted-foreground">Repeat set of actions</div>
                  </div>
                </div>

                <div
                  draggable
                  onDragStart={(e) => onDragStart(e, 'merge')}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move"
                  onClick={() => onSelectNode("merge")}
                >
                  <GitMerge className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="font-medium">Merge</div>
                    <div className="text-xs text-muted-foreground">Join multiple branches</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="error-handling">
            <AccordionTrigger className="text-sm py-2">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                Error Handling
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div
                draggable
                onDragStart={(e) => onDragStart(e, 'exception')}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted cursor-move"
                onClick={() => onSelectNode("exception")}
              >
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <div className="font-medium">Exception</div>
                  <div className="text-xs text-muted-foreground">Handle errors or exceptions</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

