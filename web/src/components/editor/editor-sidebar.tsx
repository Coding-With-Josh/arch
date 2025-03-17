"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Box,
  Image,
  Database,
  Settings,
  PanelLeft,
  Grid,
  LayoutGrid,
  FileCode,
  Workflow,
  Shapes,
  Type,
  FormInput,
  Table,
  BarChart,
  Map,
  Video,
  Music,
  Share,
  Users,
  ShoppingCart,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useElements, type ElementType } from "@/components/editor/element-provider"

interface EditorSidebarProps {
  collapsed: boolean
  onToggle: () => void
  activePanel: "elements" | "layers" | "assets" | "database"
  onPanelChange: (panel: "elements" | "layers" | "assets" | "database") => void
}

export function EditorSidebar({ collapsed, onToggle, activePanel, onPanelChange }: EditorSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { setDraggedElement } = useElements()

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

  return (
    <div className={cn("sidebar", collapsed && "collapsed")}>
      <div className="sidebar-content">
        {/* Sidebar Header */}
        <div className="sidebar-header">
          {!collapsed ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
                  <PanelLeft className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-zinc-100">FlowCanvas</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-zinc-100"
                onClick={onToggle}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 mx-auto text-zinc-400 hover:text-zinc-100"
              onClick={onToggle}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Sidebar Body */}
        <div className="sidebar-body">
          {/* Main Navigation */}
          <nav className="sidebar-nav mb-6">
            <TooltipProvider delayDuration={0}>
              <div
                className={cn("sidebar-nav-item", activePanel === "elements" && "active", collapsed && "collapsed")}
                onClick={() => onPanelChange("elements")}
              >
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Box className="h-5 w-5" />
                    </TooltipTrigger>
                    <TooltipContent side="right">Elements</TooltipContent>
                  </Tooltip>
                ) : (
                  <>
                    <Box className="h-5 w-5" />
                    <span>Elements</span>
                  </>
                )}
              </div>

              <div
                className={cn("sidebar-nav-item", activePanel === "layers" && "active", collapsed && "collapsed")}
                onClick={() => onPanelChange("layers")}
              >
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Layers className="h-5 w-5" />
                    </TooltipTrigger>
                    <TooltipContent side="right">Layers</TooltipContent>
                  </Tooltip>
                ) : (
                  <>
                    <Layers className="h-5 w-5" />
                    <span>Layers</span>
                  </>
                )}
              </div>

              <div
                className={cn("sidebar-nav-item", activePanel === "assets" && "active", collapsed && "collapsed")}
                onClick={() => onPanelChange("assets")}
              >
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image className="h-5 w-5" />
                    </TooltipTrigger>
                    <TooltipContent side="right">Assets</TooltipContent>
                  </Tooltip>
                ) : (
                  <>
                    <Image className="h-5 w-5" />
                    <span>Assets</span>
                  </>
                )}
              </div>

              <div
                className={cn("sidebar-nav-item", activePanel === "database" && "active", collapsed && "collapsed")}
                onClick={() => onPanelChange("database")}
              >
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Database className="h-5 w-5" />
                    </TooltipTrigger>
                    <TooltipContent side="right">Database</TooltipContent>
                  </Tooltip>
                ) : (
                  <>
                    <Database className="h-5 w-5" />
                    <span>Database</span>
                  </>
                )}
              </div>
            </TooltipProvider>
          </nav>

          {/* Panel Content */}
          {!collapsed && (
            <div className="px-3">
              {activePanel === "elements" && (
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

                  <Accordion
                    type="multiple"
                    className="w-full"
                    defaultValue={["layout", "basic", "form", "data", "media", "advanced"]}
                  >
                    <AccordionItem value="layout" className="border-zinc-800">
                      <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2">
                        <div className="flex items-center">
                          <LayoutGrid className="mr-2 h-4 w-4 text-zinc-400" />
                          Layout
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <ElementItem
                            icon={<Box />}
                            label="Container"
                            type="container"
                            onDragStart={handleDragStart}
                          />
                          <ElementItem icon={<Grid />} label="Grid" type="grid" onDragStart={handleDragStart} />
                          <ElementItem icon={<Shapes />} label="Section" type="section" onDragStart={handleDragStart} />
                          <ElementItem
                            icon={<LayoutGrid />}
                            label="Column"
                            type="column"
                            onDragStart={handleDragStart}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="basic" className="border-zinc-800">
                      <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2">
                        <div className="flex items-center">
                          <Type className="mr-2 h-4 w-4 text-zinc-400" />
                          Basic Elements
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <ElementItem icon={<Type />} label="Heading" type="heading" onDragStart={handleDragStart} />
                          <ElementItem
                            icon={<FileCode />}
                            label="Paragraph"
                            type="paragraph"
                            onDragStart={handleDragStart}
                          />
                          <ElementItem icon={<Box />} label="Button" type="button" onDragStart={handleDragStart} />
                          <ElementItem icon={<Image />} label="Image" type="image" onDragStart={handleDragStart} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="form" className="border-zinc-800">
                      <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2">
                        <div className="flex items-center">
                          <FormInput className="mr-2 h-4 w-4 text-zinc-400" />
                          Form Elements
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <ElementItem
                            icon={<FormInput />}
                            label="Input"
                            type="paragraph"
                            onDragStart={handleDragStart}
                          />
                          <ElementItem
                            icon={<FormInput />}
                            label="Textarea"
                            type="paragraph"
                            onDragStart={handleDragStart}
                          />
                          <ElementItem
                            icon={<FormInput />}
                            label="Checkbox"
                            type="paragraph"
                            onDragStart={handleDragStart}
                          />
                          <ElementItem
                            icon={<FormInput />}
                            label="Radio"
                            type="paragraph"
                            onDragStart={handleDragStart}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="data" className="border-zinc-800">
                      <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2">
                        <div className="flex items-center">
                          <Database className="mr-2 h-4 w-4 text-zinc-400" />
                          Data Display
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <ElementItem icon={<Table />} label="Table" type="container" onDragStart={handleDragStart} />
                          <ElementItem
                            icon={<BarChart />}
                            label="Chart"
                            type="container"
                            onDragStart={handleDragStart}
                          />
                          <ElementItem icon={<List />} label="List" type="container" onDragStart={handleDragStart} />
                          <ElementItem icon={<Map />} label="Map" type="container" onDragStart={handleDragStart} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="media" className="border-zinc-800">
                      <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2">
                        <div className="flex items-center">
                          <Image className="mr-2 h-4 w-4 text-zinc-400" />
                          Media
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <ElementItem icon={<Image />} label="Image" type="image" onDragStart={handleDragStart} />
                          <ElementItem icon={<Video />} label="Video" type="container" onDragStart={handleDragStart} />
                          <ElementItem icon={<Music />} label="Audio" type="container" onDragStart={handleDragStart} />
                          <ElementItem
                            icon={<FileCode />}
                            label="Embed"
                            type="container"
                            onDragStart={handleDragStart}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="advanced" className="border-zinc-800">
                      <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100 py-2">
                        <div className="flex items-center">
                          <Workflow className="mr-2 h-4 w-4 text-zinc-400" />
                          Advanced
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <ElementItem
                            icon={<Workflow />}
                            label="Workflow"
                            type="container"
                            onDragStart={handleDragStart}
                          />
                          <ElementItem icon={<Share />} label="Social" type="container" onDragStart={handleDragStart} />
                          <ElementItem icon={<Users />} label="Auth" type="container" onDragStart={handleDragStart} />
                          <ElementItem
                            icon={<ShoppingCart />}
                            label="Commerce"
                            type="container"
                            onDragStart={handleDragStart}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {activePanel === "layers" && (
                <div className="space-y-4">
                  <div className="text-sm text-zinc-300 mb-2">Page Structure</div>
                  <LayersTree />
                </div>
              )}

              {activePanel === "assets" && (
                <div className="space-y-4">
                  <div className="text-sm text-zinc-300 mb-2">Media Library</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square rounded-md bg-zinc-800 flex items-center justify-center">
                      <Image className="h-8 w-8 text-zinc-500" />
                    </div>
                    <div className="aspect-square rounded-md bg-zinc-800 flex items-center justify-center">
                      <Image className="h-8 w-8 text-zinc-500" />
                    </div>
                    <div className="aspect-square rounded-md bg-zinc-800 flex items-center justify-center">
                      <Video className="h-8 w-8 text-zinc-500" />
                    </div>
                    <div className="aspect-square rounded-md bg-zinc-800 flex items-center justify-center">
                      <FileCode className="h-8 w-8 text-zinc-500" />
                    </div>
                  </div>
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300">Upload New Asset</Button>
                </div>
              )}

              {activePanel === "database" && (
                <div className="space-y-4">
                  <div className="text-sm text-zinc-300 mb-2">Database Collections</div>
                  <div className="space-y-2">
                    <div className="rounded-md bg-zinc-800 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Users</span>
                        </div>
                        <span className="text-xs text-zinc-500">12 records</span>
                      </div>
                    </div>
                    <div className="rounded-md bg-zinc-800 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Products</span>
                        </div>
                        <span className="text-xs text-zinc-500">24 records</span>
                      </div>
                    </div>
                    <div className="rounded-md bg-zinc-800 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">Orders</span>
                        </div>
                        <span className="text-xs text-zinc-500">8 records</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300">Create New Collection</Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="sidebar-footer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Users className="h-4 w-4 text-zinc-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-300">Team Project</div>
                  <div className="text-xs text-zinc-500">5 collaborators</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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

function LayersTree() {
  const { elements, selectedElement, setSelectedElement } = useElements()

  const renderElement = (element: any, depth = 0) => {
    return (
      <div key={element.id} className="select-none">
        <div
          className={cn(
            "group flex items-center py-1 px-2 hover:bg-zinc-800 rounded-sm",
            selectedElement === element.id && "bg-zinc-800 text-zinc-100",
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setSelectedElement(element.id)}
        >
          {element.children.length > 0 && (
            <button className="mr-1 h-4 w-4 flex items-center justify-center text-zinc-400 hover:text-zinc-300">
              {element.expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          )}

          <div className="mr-1 h-4 w-4 flex items-center justify-center">
            <Layers className="h-3 w-3 text-zinc-500" />
          </div>

          <span className="text-xs flex-1 truncate">{element.name}</span>

          <button className="opacity-0 group-hover:opacity-100 h-4 w-4 flex items-center justify-center text-zinc-400 hover:text-zinc-300">
            {element.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          </button>
        </div>

        {element.expanded && element.children.map((child: any) => renderElement(child, depth + 1))}
      </div>
    )
  }

  return <div className="space-y-1">{elements.map((element) => renderElement(element))}</div>
}

// Import missing icons
import { Eye, EyeOff, List, ChevronDown } from "lucide-react"

