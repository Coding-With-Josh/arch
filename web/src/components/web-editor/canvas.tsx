"use client"

import type React from "react"
import type { CSSProperties } from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useElements, type ElementData, type ElementStyle } from "@/components/web-editor/element-provider"
import { ResizableElement } from "@/components/web-editor/resizable-element"

interface CanvasProps {
  viewMode: string
}

export function Canvas({ viewMode }: CanvasProps) {
  const {
    elements,
    selectedElement,
    setSelectedElement,
    getElement,
    addElement,
    draggedElement,
    setDraggedElement,
    dropTargetId,
    setDropTargetId,
  } = useElements()

  const [dropIndicator, setDropIndicator] = useState<{
    visible: boolean
    top: number
    left: number
    width: number
    height: number
  }>({
    visible: false,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  })

  const canvasRef = useRef<HTMLDivElement>(null)

  // Handle element selection
  const handleElementClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setSelectedElement(id)
  }

  // Clear selection when clicking on canvas background
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedElement(null)
    }
  }

  // Handle drop on canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    // Reset drop indicator and drag state
    setDropIndicator({ ...dropIndicator, visible: false })

    // Check if we have a valid drop target
    const targetId = dropTargetId || "root"

    // Handle element from library
    if (draggedElement?.startsWith("temp-")) {
      // Get the dragged element data from session storage
      const dragDataStr = sessionStorage.getItem("draggedElement")
      if (dragDataStr) {
        try {
          const dragData = JSON.parse(dragDataStr)
          if (dragData.element) {
            // Add the new element to the target
            addElement(dragData.element, targetId)
          }
        } catch (error) {
          console.error("Error parsing drag data:", error)
        }
      }
      // Clean up
      sessionStorage.removeItem("draggedElement")
    }
    // Handle element reordering (would be implemented here)

    setDraggedElement(null)
    setDropTargetId(null)
  }

  // Handle drag over for drop indicator positioning
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()

    if (!canvasRef.current) return

    // Get the element under the cursor
    const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement
    const targetElement = target?.closest("[data-element-id]") as HTMLElement

    if (targetElement) {
      const elementId = targetElement.dataset.elementId
      if (elementId) {
        setDropTargetId(elementId)

        // Show drop indicator
        const rect = targetElement.getBoundingClientRect()
        const canvasRect = canvasRef.current.getBoundingClientRect()

        setDropIndicator({
          visible: true,
          top: rect.top - canvasRect.top,
          left: rect.left - canvasRect.left,
          width: rect.width,
          height: rect.height,
        })
      }
    } else {
      // Reset to root if no element found
      setDropTargetId("root")
      setDropIndicator({ ...dropIndicator, visible: false })
    }
  }

  // Clear states when drag leaves canvas
  const handleDragLeave = (e: React.DragEvent) => {
    // Only react if we're actually leaving the canvas
    if (!canvasRef.current?.contains(e.relatedTarget as Node)) {
      setDropIndicator({ ...dropIndicator, visible: false })
      setDropTargetId(null)
    }
  }

  // Render an element and its children recursively
  const renderElement = (element: ElementData) => {
    if (!element.visible) return null

    const isSelected = selectedElement === element.id
    const elementStyle = element.styles as CSSProperties

    let content = null

    // Render different element types
    switch (element.type) {
      case "heading":
        content = <h2 style={elementStyle}>{element.content}</h2>
        break
      case "paragraph":
        content = <p style={elementStyle}>{element.content}</p>
        break
      case "button":
        content = (
          <button style={elementStyle} className="cursor-pointer">
            {element.content}
          </button>
        )
        break
      case "image":
        content = (
          <img
            src={element.src || "/placeholder.svg?height=200&width=300"}
            alt={element.alt || "Image"}
            style={elementStyle}
          />
        )
        break
      case "divider":
        content = <hr style={elementStyle} />
        break
      default:
        // For container elements, render children
        content = element.children.map((child) => renderElement(child))
    }

    return (
      <ResizableElement
        key={element.id}
        id={element.id}
        isSelected={isSelected}
        onClick={(e) => handleElementClick(e, element.id)}
        elementType={element.type}
      >
        {content}
      </ResizableElement>
    )
  }

  // Get the root element
  const rootElement = elements[0]

  return (
    <div
      ref={canvasRef}
      className={cn(
        "min-h-[calc(100vh-10rem)] bg-zinc-950/50 relative",
        "rounded-lg border border-zinc-800/50",
        "backdrop-blur-sm shadow-2xl",
        viewMode === "mobile" && "max-w-[375px] mx-auto",
        viewMode === "tablet" && "max-w-[768px] mx-auto",
      )}
      onClick={handleCanvasClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {dropIndicator.visible && (
        <div
          className={cn(
            "absolute pointer-events-none",
            "border-2 border-blue-500 rounded-lg",
            "bg-blue-500/10 backdrop-blur-sm",
            "transition-all duration-200 ease-out",
            "z-50"
          )}
          style={{
            top: dropIndicator.top,
            left: dropIndicator.left,
            width: dropIndicator.width,
            height: dropIndicator.height,
          }}
        />
      )}

      {/* Root element and its children */}
      <div className="p-6 space-y-6">
        {rootElement && renderElement(rootElement)}
      </div>
    </div>
  )
}

