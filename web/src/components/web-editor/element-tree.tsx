"use client"

import { ChevronRight, ChevronDown, Eye, EyeOff, Layers, Copy, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"

import { useElements, type ElementData } from "@/components/web-editor/element-provider"

export function ElementTree() {
  const {
    elements,
    selectedElement,
    setSelectedElement,
    toggleElementVisibility,
    toggleElementExpanded,
    deleteElement,
    duplicateElement,
  } = useElements()

  const renderElement = (element: ElementData, depth = 0) => {
    return (
      <div key={element.id} className="select-none">
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={cn(
                "group flex items-center py-1 px-2 hover:bg-zinc-800 rounded-sm",
                selectedElement === element.id && "bg-zinc-800 text-zinc-100",
              )}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
              onClick={() => setSelectedElement(element.id)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("element/id", element.id)
                e.dataTransfer.effectAllowed = "move"
              }}
            >
              {element.children.length > 0 && (
                <button
                  className="mr-1 h-4 w-4 flex items-center justify-center text-zinc-400 hover:text-zinc-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleElementExpanded(element.id)
                  }}
                >
                  {element.expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </button>
              )}

              <div className="mr-1 h-4 w-4 flex items-center justify-center">
                <Layers className="h-3 w-3 text-zinc-500" />
              </div>

              <span className="text-xs flex-1 truncate">{element.name}</span>

              <button
                className="opacity-0 group-hover:opacity-100 h-4 w-4 flex items-center justify-center text-zinc-400 hover:text-zinc-300"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleElementVisibility(element.id)
                }}
              >
                {element.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              </button>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="bg-zinc-900 border-zinc-700 text-zinc-100">
            <ContextMenuItem
              className="text-zinc-200 focus:bg-zinc-800 focus:text-zinc-100"
              onClick={() => duplicateElement(element.id)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </ContextMenuItem>
            {element.id !== "root" && (
              <ContextMenuItem
                className="text-zinc-200 focus:bg-zinc-800 focus:text-zinc-100"
                onClick={() => deleteElement(element.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </ContextMenuItem>
            )}
          </ContextMenuContent>
        </ContextMenu>

        {element.expanded && element.children.map((child) => renderElement(child, depth + 1))}
      </div>
    )
  }

  return <div className="space-y-1">{elements.map((element) => renderElement(element))}</div>
}

