"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useElements, type ElementType } from "@/components/editor/element-provider"

interface ResizableElementProps {
  id: string
  isSelected: boolean
  onClick: (e: React.MouseEvent) => void
  children: React.ReactNode
  elementType: ElementType
  isTouchDevice?: boolean
}

export function ResizableElement({
  id,
  isSelected,
  onClick,
  children,
  elementType,
  isTouchDevice,
}: ResizableElementProps) {
  const { getElement, updateElementStyle } = useElements()
  const element = getElement(id)

  const [resizing, setResizing] = useState<string | null>(null)
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 })
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

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

  // Touch resize handlers
  const handleTouchResizeStart = (e: React.TouchEvent, direction: string) => {
    e.stopPropagation()

    if (!elementRef.current || e.touches.length !== 1) return

    setResizing(direction)

    const rect = elementRef.current.getBoundingClientRect()
    setInitialSize({
      width: rect.width,
      height: rect.height,
    })

    const touch = e.touches[0]
    setInitialPosition({
      x: touch.clientX,
      y: touch.clientY,
    })

    // Add event listeners
    document.addEventListener("touchmove", handleTouchResizeMove, { passive: false })
    document.addEventListener("touchend", handleTouchResizeEnd)
  }

  const handleTouchResizeMove = (e: TouchEvent) => {
    if (!resizing || !elementRef.current || e.touches.length !== 1) return

    e.preventDefault() // Prevent scrolling while resizing

    const touch = e.touches[0]
    const deltaX = touch.clientX - initialPosition.x
    const deltaY = touch.clientY - initialPosition.y

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

  const handleTouchResizeEnd = () => {
    setResizing(null)

    // Remove event listeners
    document.removeEventListener("touchmove", handleTouchResizeMove)
    document.removeEventListener("touchend", handleTouchResizeEnd)
  }

  // Set up drag functionality
  const handleDragStart = (e: React.MouseEvent) => {
    if (e.button !== 0 || !elementRef.current || elementType === "section") return

    e.stopPropagation()

    setIsDragging(true)

    const rect = elementRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    document.addEventListener("mousemove", handleDragMove)
    document.addEventListener("mouseup", handleDragEnd)
  }

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !elementRef.current || !element?.parentId) return

    const parentElement = document.querySelector(`[data-element-id="${element.parentId}"]`)
    if (!parentElement) return

    const parentRect = parentElement.getBoundingClientRect()

    // Calculate new position relative to parent
    const newLeft = e.clientX - parentRect.left - dragOffset.x
    const newTop = e.clientY - parentRect.top - dragOffset.y

    // Update element styles with new position
    updateElementStyle(id, {
      position: "absolute",
      left: `${Math.max(0, newLeft)}px`,
      top: `${Math.max(0, newTop)}px`,
    })
  }

  const handleDragEnd = () => {
    setIsDragging(false)

    document.removeEventListener("mousemove", handleDragMove)
    document.removeEventListener("mouseup", handleDragEnd)
  }

  // Touch drag handlers
  const handleTouchDragStart = (e: React.TouchEvent) => {
    if (!elementRef.current || elementType === "section" || e.touches.length !== 1) return

    e.stopPropagation()

    setIsDragging(true)

    const rect = elementRef.current.getBoundingClientRect()
    const touch = e.touches[0]

    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    })

    document.addEventListener("touchmove", handleTouchDragMove, { passive: false })
    document.addEventListener("touchend", handleTouchDragEnd)
  }

  const handleTouchDragMove = (e: TouchEvent) => {
    if (!isDragging || !elementRef.current || !element?.parentId || e.touches.length !== 1) return

    e.preventDefault() // Prevent scrolling while dragging

    const parentElement = document.querySelector(`[data-element-id="${element.parentId}"]`)
    if (!parentElement) return

    const parentRect = parentElement.getBoundingClientRect()
    const touch = e.touches[0]

    // Calculate new position relative to parent
    const newLeft = touch.clientX - parentRect.left - dragOffset.x
    const newTop = touch.clientY - parentRect.top - dragOffset.y

    // Update element styles with new position
    updateElementStyle(id, {
      position: "absolute",
      left: `${Math.max(0, newLeft)}px`,
      top: `${Math.max(0, newTop)}px`,
    })
  }

  const handleTouchDragEnd = () => {
    setIsDragging(false)

    document.removeEventListener("touchmove", handleTouchDragMove)
    document.removeEventListener("touchend", handleTouchDragEnd)
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleResizeMove)
      document.removeEventListener("mouseup", handleResizeEnd)
      document.removeEventListener("mousemove", handleDragMove)
      document.removeEventListener("mouseup", handleDragEnd)
      document.removeEventListener("touchmove", handleTouchResizeMove)
      document.removeEventListener("touchend", handleTouchResizeEnd)
      document.removeEventListener("touchmove", handleTouchDragMove)
      document.removeEventListener("touchend", handleTouchDragEnd)
    }
  }, [resizing, initialSize, initialPosition, isDragging])

  // Generate the actual styles for the element
  const getElementStyles = () => {
    if (!element) return {}

    // Convert style object to React style object (camelCase)
    return element.styles
  }

  // Render the element with resize handles if selected
  return (
    <div
      ref={elementRef}
      className={cn(
        "relative draggable-element",
        isSelected && "element-selected group",
        resizing && "pointer-events-none",
        isDragging && "dragging opacity-70",
      )}
      style={getElementStyles()}
      onClick={onClick}
      data-element-id={id}
      onMouseDown={handleDragStart}
      onTouchStart={isTouchDevice ? handleTouchDragStart : undefined}
    >
      {/* Render children (content) */}
      {children}

      {/* Render resize handles if selected */}
      {isSelected && elementType !== "divider" && (
        <>
          <div
            className="resizable-handle resizable-handle-n"
            onMouseDown={(e) => handleResizeStart(e, "n")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "n") : undefined}
          />
          <div
            className="resizable-handle resizable-handle-e"
            onMouseDown={(e) => handleResizeStart(e, "e")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "e") : undefined}
          />
          <div
            className="resizable-handle resizable-handle-s"
            onMouseDown={(e) => handleResizeStart(e, "s")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "s") : undefined}
          />
          <div
            className="resizable-handle resizable-handle-w"
            onMouseDown={(e) => handleResizeStart(e, "w")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "w") : undefined}
          />
          <div
            className="resizable-handle resizable-handle-ne"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "ne") : undefined}
          />
          <div
            className="resizable-handle resizable-handle-nw"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "nw") : undefined}
          />
          <div
            className="resizable-handle resizable-handle-se"
            onMouseDown={(e) => handleResizeStart(e, "se")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "se") : undefined}
          />
          <div
            className="resizable-handle resizable-handle-sw"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "sw") : undefined}
          />
        </>
      )}

      {/* Special case for divider */}
      {isSelected && elementType === "divider" && (
        <>
          <div
            className="resizable-handle resizable-handle-e"
            onMouseDown={(e) => handleResizeStart(e, "e")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "e") : undefined}
          />
          <div
            className="resizable-handle resizable-handle-w"
            onMouseDown={(e) => handleResizeStart(e, "w")}
            onTouchStart={isTouchDevice ? (e) => handleTouchResizeStart(e, "w") : undefined}
          />
        </>
      )}

      {/* Element dimensions tooltip when resizing */}
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-zinc-900 text-zinc-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50">
          {Math.round(Number.parseFloat(element?.styles.width?.toString() || "0"))} ×{" "}
          {Math.round(Number.parseFloat(element?.styles.height?.toString() || "0"))}
        </div>
      )}
    </div>
  )
}

