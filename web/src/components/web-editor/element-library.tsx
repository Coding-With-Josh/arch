"use client"

import { useState } from "react"
import { Search, Layout, Type, ImageIcon, Square, AlignLeft, Bold, Grid, Layers, Columns } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useElements, type ElementType } from "@/components/web-editor/element-provider"
import type React from "react"

interface ElementItemProps {
  icon: React.ReactNode
  label: string
  type: ElementType
  onDragStart: (type: ElementType) => void
}

function ElementItem({ icon, label, type, onDragStart }: ElementItemProps) {
  return (
    <div
      className="flex aspect-square flex-col items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 p-2 text-xs text-zinc-300 hover:border-blue-500 hover:bg-zinc-700 hover:text-zinc-100 cursor-move transition-colors"
      draggable
      onDragStart={() => onDragStart(type)}
    >
      <div className="mb-1 h-5 w-5 text-zinc-400">{icon}</div>
      <span>{label}</span>
    </div>
  )
}

export function ElementLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const { addElement, setDraggedElement } = useElements()

  const handleDragStart = (type: ElementType) => {
    // Create a temporary element ID for dragging
    const tempId = `temp-${type}-${Date.now()}`
    const defaultStyles: Record<ElementType, any> = {
      section: {
        width: "100%",
        padding: "20px",
        backgroundColor: "#18181b", // zinc-900
      },
      container: {
        padding: "16px",
        backgroundColor: "#27272a", // zinc-800
      },
      heading: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#ffffff",
      },
      paragraph: {
        fontSize: "16px",
        color: "#d4d4d8", // zinc-300
      },
      button: {
        padding: "8px 16px",
        backgroundColor: "#3b82f6", // blue-500
        color: "#ffffff",
        borderRadius: "6px",
      },
      image: {
        width: "100%",
        height: "auto",
      },
      grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
      },
      column: {
        padding: "16px",
        backgroundColor: "#27272a", // zinc-800
      },
      divider: {
        width: "100%",
        height: "1px",
        backgroundColor: "#3f3f46", // zinc-700
      },
    }

    // Set content based on type
    const defaultContent: Partial<Record<ElementType, string>> = {
      heading: "Heading",
      paragraph: "This is a paragraph of text.",
      button: "Button",
    }

    const element = {
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
      styles: defaultStyles[type] || {},
      content: defaultContent[type],
    }

    setDraggedElement(tempId)

    // Set data transfer for drag operation
    const dragData = {
      type,
      element,
    }

    // Store data in session storage for retrieval during drop
    sessionStorage.setItem("draggedElement", JSON.stringify(dragData))
  }

  const filterElements = (items: React.ReactElement[]) => {
    if (!searchQuery) return items

    return items.filter((item) => item.props.label.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  // Structure elements
  const structureElements = [
    <ElementItem key="section" icon={<Layout />} label="Section" type="section" onDragStart={handleDragStart} />,
    <ElementItem key="container" icon={<Square />} label="Container" type="container" onDragStart={handleDragStart} />,
    <ElementItem key="grid" icon={<Grid />} label="Grid" type="grid" onDragStart={handleDragStart} />,
    <ElementItem key="column" icon={<Columns />} label="Column" type="column" onDragStart={handleDragStart} />,
  ]

  // Text elements
  const textElements = [
    <ElementItem key="heading" icon={<Type />} label="Heading" type="heading" onDragStart={handleDragStart} />,
    <ElementItem
      key="paragraph"
      icon={<AlignLeft />}
      label="Paragraph"
      type="paragraph"
      onDragStart={handleDragStart}
    />,
    <ElementItem key="button" icon={<Bold />} label="Button" type="button" onDragStart={handleDragStart} />,
  ]

  // Media elements
  const mediaElements = [
    <ElementItem key="image" icon={<ImageIcon />} label="Image" type="image" onDragStart={handleDragStart} />,
    <ElementItem key="divider" icon={<Layers />} label="Divider" type="divider" onDragStart={handleDragStart} />,
  ]

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
        <Input
          type="text"
          placeholder="Search elements..."
          className="pl-8 h-9 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-zinc-300">Recently Used</h3>
        <div className="grid grid-cols-3 gap-2">
          {filterElements([
            <ElementItem
              key="recent-section"
              icon={<Layout />}
              label="Section"
              type="section"
              onDragStart={handleDragStart}
            />,
            <ElementItem
              key="recent-heading"
              icon={<Type />}
              label="Heading"
              type="heading"
              onDragStart={handleDragStart}
            />,
            <ElementItem
              key="recent-button"
              icon={<Bold />}
              label="Button"
              type="button"
              onDragStart={handleDragStart}
            />,
          ])}
        </div>
      </div>

      <Accordion type="multiple" className="w-full" defaultValue={["structure", "text", "media"]}>
        <AccordionItem value="structure" className="border-zinc-800">
          <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2">
            <div className="flex items-center">
              <Layout className="mr-2 h-4 w-4 text-zinc-400" />
              Structure
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2 pt-2">{filterElements(structureElements)}</div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="text" className="border-zinc-800">
          <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2">
            <div className="flex items-center">
              <Type className="mr-2 h-4 w-4 text-zinc-400" />
              Text
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2 pt-2">{filterElements(textElements)}</div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="media" className="border-zinc-800">
          <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2">
            <div className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4 text-zinc-400" />
              Media
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2 pt-2">{filterElements(mediaElements)}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

