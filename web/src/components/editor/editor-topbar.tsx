"use client"

import { useState } from "react"
import {
  Save,
  Undo,
  Redo,
  Settings,
  Play,
  Share,
  Smartphone,
  Tablet,
  Monitor,
  Grid3X3,
  Ruler,
  ZoomIn,
  ZoomOut,
  Maximize,
  ChevronDown,
  FileCode,
  Workflow,
  Database,
  Globe,
  PanelLeft,
  Sidebar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EditorTopbarProps {
  viewMode: "desktop" | "tablet" | "mobile"
  onViewModeChange: (mode: "desktop" | "tablet" | "mobile") => void
  showGrid: boolean
  onToggleGrid: () => void
  showRulers: boolean
  onToggleRulers: () => void
  zoom: number
  onZoomChange: (zoom: number) => void
  isMobile?: boolean
  onToggleMobilePanel?: () => void
}

export function EditorTopbar({
  viewMode,
  onViewModeChange,
  showGrid,
  onToggleGrid,
  showRulers,
  onToggleRulers,
  zoom,
  onZoomChange,
  isMobile,
  onToggleMobilePanel,
}: EditorTopbarProps) {
  const [activeTab, setActiveTab] = useState<"design" | "flow" | "data" | "publish">("design")

  return (
    <div className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={onToggleMobilePanel}>
            <Sidebar className="h-4 w-4" />
          </Button>
        )}

        {/* Project Selector - Hide on mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 text-zinc-300 hover:text-zinc-100 hidden sm:flex">
              <span className="font-medium">My Project</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800 text-zinc-300">
            <DropdownMenuItem className="hover:bg-zinc-800 hover:text-zinc-100 hover-effect">
              <FileCode className="mr-2 h-4 w-4" />
              <span>Landing Page</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-zinc-800 hover:text-zinc-100 hover-effect">
              <FileCode className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="hover:bg-zinc-800 hover:text-zinc-100 hover-effect">
              <PanelLeft className="mr-2 h-4 w-4" />
              <span>Create New Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Tabs - Hide on small screens */}
        <div className="hidden md:flex border-r border-zinc-800 pr-4">
          <Button
            variant="ghost"
            className={`gap-2 ${activeTab === "design" ? "text-blue-500" : "text-zinc-400 hover:text-zinc-100"}`}
            onClick={() => setActiveTab("design")}
          >
            <FileCode className="h-4 w-4" />
            <span>Design</span>
          </Button>
          <Button
            variant="ghost"
            className={`gap-2 ${activeTab === "flow" ? "text-blue-500" : "text-zinc-400 hover:text-zinc-100"}`}
            onClick={() => setActiveTab("flow")}
          >
            <Workflow className="h-4 w-4" />
            <span>Flow</span>
          </Button>
          <Button
            variant="ghost"
            className={`gap-2 ${activeTab === "data" ? "text-blue-500" : "text-zinc-400 hover:text-zinc-100"}`}
            onClick={() => setActiveTab("data")}
          >
            <Database className="h-4 w-4" />
            <span>Data</span>
          </Button>
          <Button
            variant="ghost"
            className={`gap-2 ${activeTab === "publish" ? "text-blue-500" : "text-zinc-400 hover:text-zinc-100"}`}
            onClick={() => setActiveTab("publish")}
          >
            <Globe className="h-4 w-4" />
            <span>Publish</span>
          </Button>
        </div>

        {/* History - Show on all screens */}
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* View Controls - Responsive */}
        <div className="hidden sm:flex items-center rounded-md border border-zinc-800 bg-zinc-900 p-1 mr-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "mobile" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect"
                  onClick={() => onViewModeChange("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mobile View</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "tablet" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect"
                  onClick={() => onViewModeChange("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tablet View</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "desktop" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect"
                  onClick={() => onViewModeChange("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Desktop View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Canvas Controls - Hide on small screens */}
        <div className="hidden sm:flex items-center gap-1 mr-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showGrid ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect"
                  onClick={onToggleGrid}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Grid</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showRulers ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect"
                  onClick={onToggleRulers}
                >
                  <Ruler className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Rulers</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Zoom Controls - Hide on small screens */}
        <div className="hidden md:flex items-center rounded-md border border-zinc-800 bg-zinc-900 p-1 mr-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect"
                  onClick={() => onZoomChange(Math.max(25, zoom - 25))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="px-2 text-sm text-zinc-300">{zoom}%</div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect"
                  onClick={() => onZoomChange(Math.min(200, zoom + 25))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect"
                  onClick={() => onZoomChange(100)}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset Zoom</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Action Buttons - Responsive */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect">
                <Play className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Preview</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover-effect">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hidden sm:flex"
        >
          <Share className="h-4 w-4" />
          Share
        </Button>

        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4 sm:block hidden" />
          Save
        </Button>
      </div>
    </div>
  )
}

