"use client"

import type React from "react"
import type { CSSProperties } from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useElements, type ElementType, type ElementStyle } from "@/components/web-editor/element-provider"

interface ResizableElementProps {
  id: string
  isSelected: boolean
  onClick: (e: React.MouseEvent) => void
  children: React.ReactNode
  elementType: ElementType
}

export function ResizableElement({ id, isSelected, onClick, children, elementType }: ResizableElementProps) {
  const { getElement, updateElementStyle } = useElements()
  const element = getElement(id)

  const [resizing, setResizing] = useState<string | null>(null)
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 })
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 })

  const elementRef = useRef<HTMLDivElement>(null)

  // Set up resize handles
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation()
    e.preventDefault()

    if (!elementRef.current) return

    setResizing(direction)

    const rect = elementRef.current.getBoundingClientRect()
    setInitialSize({
      width: rect.width,
      height: rect.height,
    })
    setInitialPosition({
      x: e.clientX,
      y: e.clientY,
    })

    // Add event listeners
    document.addEventListener("mousemove", handleResizeMove)
    document.addEventListener("mouseup", handleResizeEnd)
  }

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizing || !elementRef.current) return

    const deltaX = e.clientX - initialPosition.x
    const deltaY = e.clientY - initialPosition.y

    let newWidth = initialSize.width
    let newHeight = initialSize.height

    // Update width and height based on resize direction
    if (resizing.includes("e")) {
      newWidth = Math.max(50, initialSize.width + deltaX)
    } else if (resizing.includes("w")) {
      newWidth = Math.max(50, initialSize.width - deltaX)
    }

    if (resizing.includes("s")) {
      newHeight = Math.max(20, initialSize.height + deltaY)
    } else if (resizing.includes("n")) {
      newHeight = Math.max(20, initialSize.height - deltaY)
    }

    // Update element styles
    updateElementStyle(id, {
      width: `${newWidth}px`,
      height: elementType !== "divider" ? `${newHeight}px` : undefined,
    })
  }

  const handleResizeEnd = () => {
    setResizing(null)

    // Remove event listeners
    document.removeEventListener("mousemove", handleResizeMove)
    document.removeEventListener("mouseup", handleResizeEnd)
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleResizeMove)
      document.removeEventListener("mouseup", handleResizeEnd)
    }
  }, [resizing, initialSize, initialPosition])

  // Generate the actual styles for the element
  const getElementStyles = (): CSSProperties => {
    if (!element) return {}
    return element.styles as CSSProperties
  }

  // Render the element with resize handles if selected
  return (
    <div
      ref={elementRef}
      className={cn(
        "relative draggable-element",
        isSelected && "element-selected group",
        resizing && "pointer-events-none",
      )}
      style={getElementStyles()}
      onClick={onClick}
      data-element-id={id}
      draggable={elementType !== "divider"}
    >
      {/* Render children (content) */}
      {children}

      {/* Render resize handles if selected */}
      {isSelected && elementType !== "divider" && (
        <>
          <div className="resizable-handle resizable-handle-n" onMouseDown={(e) => handleResizeStart(e, "n")} />
          <div className="resizable-handle resizable-handle-e" onMouseDown={(e) => handleResizeStart(e, "e")} />
          <div className="resizable-handle resizable-handle-s" onMouseDown={(e) => handleResizeStart(e, "s")} />
          <div className="resizable-handle resizable-handle-w" onMouseDown={(e) => handleResizeStart(e, "w")} />
          <div className="resizable-handle resizable-handle-ne" onMouseDown={(e) => handleResizeStart(e, "ne")} />
          <div className="resizable-handle resizable-handle-nw" onMouseDown={(e) => handleResizeStart(e, "nw")} />
          <div className="resizable-handle resizable-handle-se" onMouseDown={(e) => handleResizeStart(e, "se")} />
          <div className="resizable-handle resizable-handle-sw" onMouseDown={(e) => handleResizeStart(e, "sw")} />
        </>
      )}

      {/* Special case for divider */}
      {isSelected && elementType === "divider" && (
        <>
          <div className="resizable-handle resizable-handle-e" onMouseDown={(e) => handleResizeStart(e, "e")} />
          <div className="resizable-handle resizable-handle-w" onMouseDown={(e) => handleResizeStart(e, "w")} />
        </>
      )}
    </div>
  )
}

