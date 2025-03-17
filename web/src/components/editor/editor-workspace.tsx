"use client"

import { useState, useEffect } from "react"
import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { EditorTopbar } from "@/components/editor/editor-topbar"
import { EditorCanvas } from "@/components/editor/editor-canvas"
import { PropertiesPanel } from "@/components/editor/properties-panel"
import { cn } from "@/lib/utils"

export function EditorWorkspace() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showGrid, setShowGrid] = useState(true)
  const [showRulers, setShowRulers] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [activePanel, setActivePanel] = useState<"elements" | "layers" | "assets" | "database">("elements")
  const [isMobile, setIsMobile] = useState(false)
  const [showMobilePanel, setShowMobilePanel] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
    if (isMobile) {
      setShowMobilePanel(false)
    }
  }

  const toggleMobilePanel = () => {
    setShowMobilePanel(!showMobilePanel)
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <EditorSidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        className={cn(isMobile && "active")}
      />

      {/* Main Content */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarCollapsed ? "ml-[var(--sidebar-width-collapsed)]" : "ml-[var(--sidebar-width)]",
          isMobile && "ml-0",
        )}
      >
        {/* Top Bar */}
        <EditorTopbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid(!showGrid)}
          showRulers={showRulers}
          onToggleRulers={() => setShowRulers(!showRulers)}
          zoom={zoom}
          onZoomChange={setZoom}
          onToggleMobilePanel={toggleMobilePanel}
          isMobile={isMobile}
        />

        {/* Canvas */}
        <EditorCanvas viewMode={viewMode} showGrid={showGrid} showRulers={showRulers} zoom={zoom} />
      </div>

      {/* Properties Panel */}
      <PropertiesPanel
        className={cn(isMobile && showMobilePanel && "active")}
        onClose={isMobile ? () => setShowMobilePanel(false) : undefined}
      />
    </div>
  )
}

