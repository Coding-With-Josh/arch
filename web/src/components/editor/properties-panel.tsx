"use client"

import { useState } from "react"
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Grid,
  Box,
  Type,
  Palette,
  Settings,
  Sliders,
  ChevronRight,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Move,
  Code,
  Layers,
  Workflow,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useElements } from "@/components/editor/element-provider"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface PropertiesPanelProps {
  className?: string
  onClose?: () => void
}

export function PropertiesPanel({ className, onClose }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState("style")
  const [dimensionsLocked, setDimensionsLocked] = useState(false)
  const { selectedElement, getElement, updateElement, updateElementStyle, deleteElement, duplicateElement } =
    useElements()

  const element = selectedElement ? getElement(selectedElement) : null

  const handleStyleChange = (property: string, value: string) => {
    if (!selectedElement) return
    updateElementStyle(selectedElement, { [property]: value })
  }

  const handleNameChange = (name: string) => {
    if (!selectedElement) return
    updateElement(selectedElement, { name })
  }

  const handleContentChange = (content: string) => {
    if (!selectedElement) return
    updateElement(selectedElement, { content })
  }

  const handleDimensionChange = (dimension: "width" | "height", value: string) => {
    if (!selectedElement) return

    if (dimensionsLocked && element) {
      // Calculate aspect ratio
      const currentWidth = Number.parseFloat(element.styles.width?.toString() || "100")
      const currentHeight = Number.parseFloat(element.styles.height?.toString() || "100")
      const ratio = currentWidth / currentHeight

      if (dimension === "width") {
        const newWidth = Number.parseFloat(value)
        const newHeight = newWidth / ratio
        updateElementStyle(selectedElement, {
          width: `${newWidth}px`,
          height: `${newHeight}px`,
        })
      } else {
        const newHeight = Number.parseFloat(value)
        const newWidth = newHeight * ratio
        updateElementStyle(selectedElement, {
          width: `${newWidth}px`,
          height: `${newHeight}px`,
        })
      }
    } else {
      updateElementStyle(selectedElement, { [dimension]: `${value}px` })
    }
  }

  const handleDeleteElement = () => {
    if (!selectedElement) return
    deleteElement(selectedElement)
  }

  const handleDuplicateElement = () => {
    if (!selectedElement) return
    duplicateElement(selectedElement)
  }

  return (
    <div className={cn("properties-panel", className)}>
      <div className="properties-panel-header">
        <h3 className="text-sm font-medium text-zinc-300">{selectedElement ? "Properties" : "No Element Selected"}</h3>
        <div className="flex items-center gap-2">
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-100">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="properties-panel-body">
        {!selectedElement ? (
          <div className="flex h-40 flex-col items-center justify-center text-center text-sm text-zinc-500">
            <Sliders className="mb-2 h-10 w-10 opacity-20" />
            <p>Select an element to edit its properties</p>
          </div>
        ) : (
          <>
            {/* Element Actions */}
            <div className="properties-section">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center">
                    <Layers className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300">{element?.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-zinc-400 hover:text-zinc-100"
                    onClick={handleDuplicateElement}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-zinc-400 hover:text-zinc-100"
                    onClick={handleDeleteElement}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="properties-field">
                  <Label className="properties-field-label">Element ID</Label>
                  <Input
                    value={selectedElement}
                    className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-400"
                    disabled
                  />
                </div>
                <div className="properties-field">
                  <Label className="properties-field-label">Element Type</Label>
                  <Input
                    value={element?.type}
                    className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-400"
                    disabled
                  />
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-zinc-800/50 mb-4">
                <TabsTrigger value="style" className="data-[state=active]:bg-zinc-700">
                  Style
                </TabsTrigger>
                <TabsTrigger value="layout" className="data-[state=active]:bg-zinc-700">
                  Layout
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-zinc-700">
                  Advanced
                </TabsTrigger>
              </TabsList>

              {activeTab === "style" && (
                <div className="space-y-6">
                  {/* Content */}
                  {(element?.type === "heading" || element?.type === "paragraph" || element?.type === "button") && (
                    <div className="properties-section">
                      <h4 className="properties-section-header">
                        <Type className="h-4 w-4 text-zinc-400" />
                        Content
                      </h4>
                      <div className="space-y-3">
                        <div className="properties-field">
                          <Label className="properties-field-label">Text Content</Label>
                          <textarea
                            value={element?.content || ""}
                            className="w-full h-20 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-100 resize-none"
                            onChange={(e) => handleContentChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Typography */}
                  {(element?.type === "heading" || element?.type === "paragraph" || element?.type === "button") && (
                    <div className="properties-section">
                      <h4 className="properties-section-header">
                        <Type className="h-4 w-4 text-zinc-400" />
                        Typography
                      </h4>
                      <div className="space-y-3">
                        <div className="properties-grid">
                          <div className="properties-field">
                            <Label className="properties-field-label">Font</Label>
                            <select
                              className="w-full h-8 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                              value={element?.styles.fontFamily || "sans-serif"}
                              onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
                            >
                              <option value="sans-serif">Sans Serif</option>
                              <option value="serif">Serif</option>
                              <option value="monospace">Monospace</option>
                            </select>
                          </div>
                          <div className="properties-field">
                            <Label className="properties-field-label">Size</Label>
                            <div className="dimension-control">
                              <Input
                                type="text"
                                value={element?.styles.fontSize?.replace("px", "") || "16"}
                                className="dimension-input"
                                onChange={(e) => handleStyleChange("fontSize", `${e.target.value}px`)}
                              />
                              <select className="dimension-unit" value="px">
                                <option value="px">px</option>
                                <option value="em">em</option>
                                <option value="rem">rem</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="properties-grid">
                          <div className="properties-field">
                            <Label className="properties-field-label">Weight</Label>
                            <select
                              className="w-full h-8 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                              value={element?.styles.fontWeight || "normal"}
                              onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                            >
                              <option value="normal">Regular</option>
                              <option value="500">Medium</option>
                              <option value="bold">Bold</option>
                            </select>
                          </div>
                          <div className="properties-field">
                            <Label className="properties-field-label">Line Height</Label>
                            <div className="dimension-control">
                              <Input
                                type="text"
                                value={element?.styles.lineHeight || "1.5"}
                                className="dimension-input"
                                onChange={(e) => handleStyleChange("lineHeight", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="properties-field">
                          <Label className="properties-field-label">Color</Label>
                          <div className="flex gap-2">
                            <div className="color-picker-wrapper flex-1">
                              <div
                                className="color-swatch"
                                style={{ backgroundColor: element?.styles.color || "#ffffff" }}
                              ></div>
                              <Input
                                type="text"
                                value={element?.styles.color || "#ffffff"}
                                className="h-8 text-xs pl-8 bg-zinc-800 border-zinc-700 text-zinc-100"
                                onChange={(e) => handleStyleChange("color", e.target.value)}
                              />
                            </div>
                            <Input
                              type="color"
                              value={element?.styles.color || "#ffffff"}
                              className="h-8 w-9 p-0 border-0 bg-transparent"
                              onChange={(e) => handleStyleChange("color", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="properties-field">
                          <Label className="properties-field-label">Alignment</Label>
                          <div className="flex">
                            <Button
                              variant="outline"
                              size="icon"
                              className={cn(
                                "h-8 w-8 rounded-r-none border-zinc-700 bg-zinc-800 text-zinc-400",
                                element?.styles.textAlign === "left" && "bg-zinc-700 text-zinc-100",
                              )}
                              onClick={() => handleStyleChange("textAlign", "left")}
                            >
                              <AlignLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className={cn(
                                "h-8 w-8 rounded-none border-l-0 border-zinc-700 bg-zinc-800 text-zinc-400",
                                element?.styles.textAlign === "center" && "bg-zinc-700 text-zinc-100",
                              )}
                              onClick={() => handleStyleChange("textAlign", "center")}
                            >
                              <AlignCenter className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className={cn(
                                "h-8 w-8 rounded-none border-l-0 border-zinc-700 bg-zinc-800 text-zinc-400",
                                element?.styles.textAlign === "right" && "bg-zinc-700 text-zinc-100",
                              )}
                              onClick={() => handleStyleChange("textAlign", "right")}
                            >
                              <AlignRight className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className={cn(
                                "h-8 w-8 rounded-l-none border-l-0 border-zinc-700 bg-zinc-800 text-zinc-400",
                                element?.styles.textAlign === "justify" && "bg-zinc-700 text-zinc-100",
                              )}
                              onClick={() => handleStyleChange("textAlign", "justify")}
                            >
                              <AlignJustify className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appearance */}
                  <div className="properties-section">
                    <h4 className="properties-section-header">
                      <Palette className="h-4 w-4 text-zinc-400" />
                      Appearance
                    </h4>
                    <div className="space-y-3">
                      <div className="properties-field">
                        <Label className="properties-field-label">Background Color</Label>
                        <div className="flex gap-2">
                          <div className="color-picker-wrapper flex-1">
                            <div
                              className="color-swatch"
                              style={{ backgroundColor: element?.styles.backgroundColor || "transparent" }}
                            ></div>
                            <Input
                              type="text"
                              value={element?.styles.backgroundColor || "transparent"}
                              className="h-8 text-xs pl-8 bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                            />
                          </div>
                          <Input
                            type="color"
                            value={element?.styles.backgroundColor || "#18181b"}
                            className="h-8 w-9 p-0 border-0 bg-transparent"
                            onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="properties-field">
                        <Label className="properties-field-label">Border Radius</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={element?.styles.borderRadius?.replace("px", "") || "0"}
                            className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100 w-16"
                            onChange={(e) => handleStyleChange("borderRadius", `${e.target.value}px`)}
                          />
                          <div className="flex-1">
                            <Slider
                              value={[Number.parseInt(element?.styles.borderRadius?.replace("px", "") || "0")]}
                              min={0}
                              max={50}
                              step={1}
                              className="py-1"
                              onValueChange={(value) => handleStyleChange("borderRadius", `${value[0]}px`)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="properties-grid">
                        <div className="properties-field">
                          <Label className="properties-field-label">Border Width</Label>
                          <Input
                            type="text"
                            value={element?.styles.borderWidth?.replace("px", "") || "0"}
                            value={element?.styles.borderWidth?.replace("px", "") || "0"}
                            className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                            onChange={(e) => handleStyleChange("borderWidth", `${e.target.value}px`)}
                          />
                        </div>
                        <div className="properties-field">
                          <Label className="properties-field-label">Border Style</Label>
                          <select
                            className="h-8 w-full rounded-md border border-zinc-700 bg-zinc-800 px-2 text-xs text-zinc-100"
                            value={element?.styles.borderStyle || "solid"}
                            onChange={(e) => handleStyleChange("borderStyle", e.target.value)}
                          >
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>

                      <div className="properties-field">
                        <Label className="properties-field-label">Border Color</Label>
                        <div className="flex gap-2">
                          <div className="color-picker-wrapper flex-1">
                            <div
                              className="color-swatch"
                              style={{ backgroundColor: element?.styles.borderColor || "#3f3f46" }}
                            ></div>
                            <Input
                              type="text"
                              value={element?.styles.borderColor || "#3f3f46"}
                              className="h-8 text-xs pl-8 bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("borderColor", e.target.value)}
                            />
                          </div>
                          <Input
                            type="color"
                            value={element?.styles.borderColor || "#3f3f46"}
                            className="h-8 w-9 p-0 border-0 bg-transparent"
                            onChange={(e) => handleStyleChange("borderColor", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="properties-field">
                        <Label className="properties-field-label">Opacity</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={element?.styles.opacity || "1"}
                            className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100 w-16"
                            onChange={(e) => handleStyleChange("opacity", e.target.value)}
                          />
                          <div className="flex-1">
                            <Slider
                              value={[Number.parseFloat(element?.styles.opacity?.toString() || "1") * 100]}
                              min={0}
                              max={100}
                              step={1}
                              className="py-1"
                              onValueChange={(value) => handleStyleChange("opacity", `${value[0] / 100}`)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "layout" && (
                <div className="space-y-6">
                  {/* Dimensions */}
                  <div className="properties-section">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="properties-section-header">
                        <Box className="h-4 w-4 text-zinc-400" />
                        Dimensions
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-zinc-400 hover:text-zinc-100"
                        onClick={() => setDimensionsLocked(!dimensionsLocked)}
                      >
                        {dimensionsLocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                    <div className="properties-grid">
                      <div className="properties-field">
                        <Label className="properties-field-label">Width</Label>
                        <div className="dimension-control">
                          <Input
                            type="text"
                            value={element?.styles.width?.replace(/[^0-9]/g, "") || "100"}
                            className="dimension-input"
                            onChange={(e) => handleDimensionChange("width", e.target.value)}
                          />
                          <select
                            className="dimension-unit"
                            value={element?.styles.width?.replace(/[0-9]/g, "") || "%"}
                            onChange={(e) => {
                              const value = element?.styles.width?.replace(/[^0-9]/g, "") || "100"
                              handleStyleChange("width", `${value}${e.target.value}`)
                            }}
                          >
                            <option value="%">%</option>
                            <option value="px">px</option>
                            <option value="auto">auto</option>
                          </select>
                        </div>
                      </div>
                      <div className="properties-field">
                        <Label className="properties-field-label">Height</Label>
                        <div className="dimension-control">
                          <Input
                            type="text"
                            value={element?.styles.height?.replace(/[^0-9]/g, "") || "auto"}
                            className="dimension-input"
                            onChange={(e) => handleDimensionChange("height", e.target.value)}
                          />
                          <select
                            className="dimension-unit"
                            value={element?.styles.height?.replace(/[0-9]/g, "") || "auto"}
                            onChange={(e) => {
                              const value = element?.styles.height?.replace(/[^0-9]/g, "") || "auto"
                              handleStyleChange("height", `${value}${e.target.value}`)
                            }}
                          >
                            <option value="auto">auto</option>
                            <option value="px">px</option>
                            <option value="%">%</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Position */}
                  <div className="properties-section">
                    <h4 className="properties-section-header">
                      <Move className="h-4 w-4 text-zinc-400" />
                      Position
                    </h4>
                    <div className="properties-field mb-3">
                      <Label className="properties-field-label">Position Type</Label>
                      <select
                        className="w-full h-8 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                        value={element?.styles.position || "static"}
                        onChange={(e) => handleStyleChange("position", e.target.value)}
                      >
                        <option value="static">Static</option>
                        <option value="relative">Relative</option>
                        <option value="absolute">Absolute</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </div>

                    {element?.styles.position !== "static" && (
                      <div className="grid grid-cols-4 gap-2">
                        <div className="properties-field">
                          <Label className="properties-field-label">Top</Label>
                          <Input
                            type="text"
                            value={element?.styles.top?.replace("px", "") || "auto"}
                            className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                            onChange={(e) => handleStyleChange("top", `${e.target.value}px`)}
                          />
                        </div>
                        <div className="properties-field">
                          <Label className="properties-field-label">Right</Label>
                          <Input
                            type="text"
                            value={element?.styles.right?.replace("px", "") || "auto"}
                            className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                            onChange={(e) => handleStyleChange("right", `${e.target.value}px`)}
                          />
                        </div>
                        <div className="properties-field">
                          <Label className="properties-field-label">Bottom</Label>
                          <Input
                            type="text"
                            value={element?.styles.bottom?.replace("px", "") || "auto"}
                            className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                            onChange={(e) => handleStyleChange("bottom", `${e.target.value}px`)}
                          />
                        </div>
                        <div className="properties-field">
                          <Label className="properties-field-label">Left</Label>
                          <Input
                            type="text"
                            value={element?.styles.left?.replace("px", "") || "auto"}
                            className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                            onChange={(e) => handleStyleChange("left", `${e.target.value}px`)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Spacing */}
                  <div className="properties-section">
                    <h4 className="properties-section-header">
                      <Box className="h-4 w-4 text-zinc-400" />
                      Spacing
                    </h4>
                    <div className="space-y-3">
                      <div className="properties-field">
                        <Label className="properties-field-label">Margin</Label>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Top</span>
                            <Input
                              type="text"
                              value={element?.styles.marginTop?.replace("px", "") || "0"}
                              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("marginTop", `${e.target.value}px`)}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Right</span>
                            <Input
                              type="text"
                              value={element?.styles.marginRight?.replace("px", "") || "0"}
                              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("marginRight", `${e.target.value}px`)}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Bottom</span>
                            <Input
                              type="text"
                              value={element?.styles.marginBottom?.replace("px", "") || "0"}
                              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("marginBottom", `${e.target.value}px`)}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Left</span>
                            <Input
                              type="text"
                              value={element?.styles.marginLeft?.replace("px", "") || "0"}
                              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("marginLeft", `${e.target.value}px`)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="properties-field">
                        <Label className="properties-field-label">Padding</Label>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Top</span>
                            <Input
                              type="text"
                              value={element?.styles.paddingTop?.replace("px", "") || "0"}
                              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("paddingTop", `${e.target.value}px`)}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Right</span>
                            <Input
                              type="text"
                              value={element?.styles.paddingRight?.replace("px", "") || "0"}
                              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("paddingRight", `${e.target.value}px`)}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Bottom</span>
                            <Input
                              type="text"
                              value={element?.styles.paddingBottom?.replace("px", "") || "0"}
                              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("paddingBottom", `${e.target.value}px`)}
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500">Left</span>
                            <Input
                              type="text"
                              value={element?.styles.paddingLeft?.replace("px", "") || "0"}
                              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("paddingLeft", `${e.target.value}px`)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Display */}
                  <div className="properties-section">
                    <h4 className="properties-section-header">
                      <Grid className="h-4 w-4 text-zinc-400" />
                      Display
                    </h4>
                    <div className="space-y-3">
                      <div className="properties-field">
                        <Label className="properties-field-label">Display</Label>
                        <select
                          className="w-full h-8 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                          value={element?.styles.display || "block"}
                          onChange={(e) => handleStyleChange("display", e.target.value)}
                        >
                          <option value="block">Block</option>
                          <option value="flex">Flex</option>
                          <option value="grid">Grid</option>
                          <option value="inline">Inline</option>
                          <option value="inline-block">Inline Block</option>
                          <option value="none">None</option>
                        </select>
                      </div>

                      {element?.styles.display === "flex" && (
                        <>
                          <div className="properties-field">
                            <Label className="properties-field-label">Flex Direction</Label>
                            <select
                              className="w-full h-8 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                              value={element?.styles.flexDirection || "row"}
                              onChange={(e) => handleStyleChange("flexDirection", e.target.value)}
                            >
                              <option value="row">Row</option>
                              <option value="column">Column</option>
                              <option value="row-reverse">Row Reverse</option>
                              <option value="column-reverse">Column Reverse</option>
                            </select>
                          </div>

                          <div className="properties-grid">
                            <div className="properties-field">
                              <Label className="properties-field-label">Justify Content</Label>
                              <select
                                className="w-full h-8 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                                value={element?.styles.justifyContent || "flex-start"}
                                onChange={(e) => handleStyleChange("justifyContent", e.target.value)}
                              >
                                <option value="flex-start">Start</option>
                                <option value="center">Center</option>
                                <option value="flex-end">End</option>
                                <option value="space-between">Space Between</option>
                                <option value="space-around">Space Around</option>
                              </select>
                            </div>
                            <div className="properties-field">
                              <Label className="properties-field-label">Align Items</Label>
                              <select
                                className="w-full h-8 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                                value={element?.styles.alignItems || "stretch"}
                                onChange={(e) => handleStyleChange("alignItems", e.target.value)}
                              >
                                <option value="stretch">Stretch</option>
                                <option value="flex-start">Start</option>
                                <option value="center">Center</option>
                                <option value="flex-end">End</option>
                                <option value="baseline">Baseline</option>
                              </select>
                            </div>
                          </div>

                          <div className="properties-field">
                            <Label className="properties-field-label">Gap</Label>
                            <Input
                              type="text"
                              value={element?.styles.gap?.replace("px", "") || "0"}
                              className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("gap", `${e.target.value}px`)}
                            />
                          </div>
                        </>
                      )}

                      {element?.styles.display === "grid" && (
                        <>
                          <div className="properties-field">
                            <Label className="properties-field-label">Grid Template Columns</Label>
                            <Input
                              type="text"
                              value={element?.styles.gridTemplateColumns || "1fr 1fr"}
                              className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("gridTemplateColumns", e.target.value)}
                            />
                            <p className="properties-field-hint">E.g. 1fr 1fr or repeat(3, 1fr)</p>
                          </div>

                          <div className="properties-field">
                            <Label className="properties-field-label">Grid Template Rows</Label>
                            <Input
                              type="text"
                              value={element?.styles.gridTemplateRows || "auto"}
                              className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("gridTemplateRows", e.target.value)}
                            />
                          </div>

                          <div className="properties-field">
                            <Label className="properties-field-label">Gap</Label>
                            <Input
                              type="text"
                              value={element?.styles.gap?.replace("px", "") || "0"}
                              className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              onChange={(e) => handleStyleChange("gap", `${e.target.value}px`)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "advanced" && (
                <div className="space-y-6">
                  {/* Element Settings */}
                  <div className="properties-section">
                    <h4 className="properties-section-header">
                      <Settings className="h-4 w-4 text-zinc-400" />
                      Element Settings
                    </h4>
                    <div className="space-y-3">
                      <div className="properties-field">
                        <Label className="properties-field-label">Element Name</Label>
                        <Input
                          value={element?.name || ""}
                          className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                          onChange={(e) => handleNameChange(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium text-zinc-400">Visibility</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-zinc-500">{element?.visible ? "Visible" : "Hidden"}</span>
                          <Switch
                            checked={element?.visible}
                            onCheckedChange={(checked) => updateElement(selectedElement, { visible: checked })}
                          />
                        </div>
                      </div>

                      {element?.type === "button" && (
                        <div className="properties-field">
                          <Label className="properties-field-label">Link URL</Label>
                          <Input
                            placeholder="https://example.com"
                            className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                            value={element?.href || ""}
                            onChange={(e) => updateElement(selectedElement, { href: e.target.value })}
                          />
                        </div>
                      )}

                      {element?.type === "image" && (
                        <>
                          <div className="properties-field">
                            <Label className="properties-field-label">Image URL</Label>
                            <Input
                              placeholder="https://example.com/image.jpg"
                              className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              value={element?.src || ""}
                              onChange={(e) => updateElement(selectedElement, { src: e.target.value })}
                            />
                          </div>
                          <div className="properties-field">
                            <Label className="properties-field-label">Alt Text</Label>
                            <Input
                              placeholder="Image description"
                              className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                              value={element?.alt || ""}
                              onChange={(e) => updateElement(selectedElement, { alt: e.target.value })}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Custom CSS */}
                  <div className="properties-section">
                    <h4 className="properties-section-header">
                      <Code className="h-4 w-4 text-zinc-400" />
                      Custom CSS
                    </h4>
                    <div className="properties-field">
                      <textarea
                        placeholder="Enter custom CSS properties..."
                        className="w-full h-32 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-100 resize-none font-mono"
                      />
                      <p className="properties-field-hint">Custom CSS will override any styles set above</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="properties-section">
                    <h4 className="properties-section-header">
                      <Workflow className="h-4 w-4 text-zinc-400" />
                      Actions
                    </h4>
                    <div className="space-y-3">
                      <div className="properties-field">
                        <Label className="properties-field-label">On Click</Label>
                        <select className="w-full h-8 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100">
                          <option value="none">None</option>
                          <option value="link">Open Link</option>
                          <option value="popup">Open Popup</option>
                          <option value="workflow">Run Workflow</option>
                        </select>
                      </div>

                      <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300">Add Action</Button>
                    </div>
                  </div>
                </div>
              )}
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}

