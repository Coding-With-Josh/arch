"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useElements, type ElementData } from "@/components/editor/element-provider"
import { ResizableElement } from "@/components/editor/resizable-element"
import { Move, Plus, Minus } from "lucide-react"

interface EditorCanvasProps {
  viewMode: "desktop" | "tablet" | "mobile"
  showGrid: boolean
  showRulers: boolean
  zoom: number
}

export function EditorCanvas({ viewMode, showGrid, showRulers, zoom: initialZoom }: EditorCanvasProps) {
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

  const [isDragging, setIsDragging] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(initialZoom)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)
  const canvasWrapperRef = useRef<HTMLDivElement>(null)

  // Detect touch devices
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  // Update zoom when prop changes
  useEffect(() => {
    setZoom(initialZoom)
  }, [initialZoom])

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

    setDraggedElement(null)
    setDropTargetId(null)
    setIsDragging(false)
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

  // Handle canvas panning with spacebar + drag
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      document.body.style.cursor = "grab"
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      document.body.style.cursor = "default"
      setIsPanning(false)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // Check if spacebar is pressed (for panning)
    if (e.buttons === 1 && e.currentTarget === canvasWrapperRef.current && e.getModifierState("Space")) {
      setIsPanning(true)
      setPanStart({ x: e.clientX, y: e.clientY })
      document.body.style.cursor = "grabbing"
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      const dx = e.clientX - panStart.x
      const dy = e.clientY - panStart.y
      setCanvasOffset({
        x: canvasOffset.x + dx,
        y: canvasOffset.y + dy,
      })
      setPanStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false)
      document.body.style.cursor = "grab"
    }
  }

  // Touch event handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Two finger touch for panning
      setIsPanning(true)
      const touch1 = e.touches[0]
      setPanStart({ x: touch1.clientX, y: touch1.clientY })
      e.preventDefault()
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPanning && e.touches.length === 2) {
      const touch1 = e.touches[0]
      const dx = touch1.clientX - panStart.x
      const dy = touch1.clientY - panStart.y
      setCanvasOffset({
        x: canvasOffset.x + dx,
        y: canvasOffset.y + dy,
      })
      setPanStart({ x: touch1.clientX, y: touch1.clientY })
    }
  }

  const handleTouchEnd = () => {
    setIsPanning(false)
  }

  // Add event listeners for keyboard shortcuts
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Render an element and its children recursively
  const renderElement = (element: ElementData) => {
    if (!element.visible) return null

    const isSelected = selectedElement === element.id

    const elementStyle = {
      ...element.styles,
    }

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
          <button style={elementStyle} className="cursor-pointer hover-effect">
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
        isTouchDevice={isTouchDevice}
      >
        {content}
      </ResizableElement>
    )
  }

  // Get the root element
  const rootElement = elements[0]

  // Calculate canvas scale based on zoom level
  const scale = zoom / 100

  return (
    <div
      ref={canvasWrapperRef}
      className="canvas-wrapper"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Rulers */}
      {showRulers && !isTouchDevice && (
        <div className="canvas-rulers">
          <div className="canvas-ruler-corner" />
          <div className="canvas-ruler-h">
            {/* Horizontal ruler markers */}
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute top-0 bottom-0 border-r border-zinc-700"
                style={{ left: `${i * 100}px`, width: "1px" }}
              />
            ))}
          </div>
          <div className="canvas-ruler-v">
            {/* Vertical ruler markers */}
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute left-0 right-0 border-b border-zinc-700"
                style={{ top: `${i * 100}px`, height: "1px" }}
              />
            ))}
          </div>
        </div>
      )}

      <div
        ref={canvasRef}
        className={cn("canvas", viewMode, "transition-transform duration-200")}
        style={{
          transform: `scale(${scale}) translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
          transformOrigin: "center",
        }}
        onClick={handleCanvasClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Grid */}
        {showGrid && <div className="canvas-grid" />}

        {/* Drop indicator */}
        {dropIndicator.visible && (
          <div
            className="drop-indicator"
            style={{
              top: dropIndicator.top,
              left: dropIndicator.left,
              width: dropIndicator.width,
              height: dropIndicator.height,
            }}
          />
        )}

        {/* Root element and its children */}
        {rootElement && renderElement(rootElement)}
      </div>

      {/* Canvas Controls */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        <div className="flex items-center rounded-md bg-zinc-900 border border-zinc-800 shadow-lg">
          <button
            className="p-2 text-zinc-400 hover:text-zinc-100 hover-effect focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => setZoom(Math.max(25, zoom - 25))}
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="px-2 text-sm text-zinc-300">{zoom}%</div>
          <button
            className="p-2 text-zinc-400 hover:text-zinc-100 hover-effect focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => setZoom(Math.min(200, zoom + 25))}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover-effect shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          onClick={() => {
            setCanvasOffset({ x: 0, y: 0 })
            setZoom(100)
          }}
        >
          <Move className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

