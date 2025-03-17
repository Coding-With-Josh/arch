"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Smartphone, Tablet, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ElementTree } from "@/components/web-editor/element-tree"
import { StylePanel } from "@/components/web-editor/style-panel"
import { Canvas } from "@/components/web-editor/canvas"
import { WebEditorHeader } from "@/components/web-editor/web-editor-header"
import { ElementLibrary } from "@/components/web-editor/element-library"
import { useElements } from "@/components/web-editor/element-provider"

export function WebEditor() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("elements")
  const [viewMode, setViewMode] = useState("desktop")
  const { selectedElement, setSelectedElement } = useElements()

  const handleSwitchToFlowBuilder = () => {
    router.push("/flow-builder")
  }

  return (
    <div className="flex h-full flex-col">
      <WebEditorHeader onSwitchToFlowBuilder={handleSwitchToFlowBuilder} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="flex w-64 flex-col border-r border-zinc-800 bg-zinc-900">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800/50">
              <TabsTrigger value="elements" className="data-[state=active]:bg-zinc-700">
                Elements
              </TabsTrigger>
              <TabsTrigger value="layers" className="data-[state=active]:bg-zinc-700">
                Layers
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex-1 overflow-auto p-4">
            {activeTab === "elements" ? <ElementLibrary /> : <ElementTree />}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-center border-b border-zinc-800 bg-zinc-900/60 p-2">
            <div className="flex items-center rounded-md border border-zinc-700 bg-zinc-800 p-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "mobile" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8 text-zinc-300 hover:text-zinc-100"
                      onClick={() => setViewMode("mobile")}
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
                      className="h-8 w-8 text-zinc-300 hover:text-zinc-100"
                      onClick={() => setViewMode("tablet")}
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
                      className="h-8 w-8 text-zinc-300 hover:text-zinc-100"
                      onClick={() => setViewMode("desktop")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Desktop View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-zinc-950 p-4">
            <Canvas viewMode={viewMode} />
          </div>
        </div>

        {/* Right Sidebar */}
        <StylePanel />
      </div>
    </div>
  )
}

