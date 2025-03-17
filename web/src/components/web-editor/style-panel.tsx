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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useElements } from "@/components/web-editor/element-provider"
import { Slider } from "@/components/ui/slider"

export function StylePanel() {
  const [activeTab, setActiveTab] = useState("style")
  const { selectedElement, getElement, updateElement, updateElementStyle } = useElements()

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

  return (
    <div className="w-72 border-l border-zinc-800 bg-zinc-900">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800/50">
          <TabsTrigger value="style" className="data-[state=active]:bg-zinc-700">
            Style
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-zinc-700">
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="overflow-auto p-4 h-[calc(100vh-8.5rem)]">
        {activeTab === "style" ? (
          <div className="space-y-6">
            {!selectedElement ? (
              <div className="flex h-40 flex-col items-center justify-center text-center text-sm text-zinc-500">
                <Palette className="mb-2 h-10 w-10 opacity-20" />
                <p>Select an element to edit its style</p>
              </div>
            ) : (
              <>
                <Accordion
                  type="multiple"
                  defaultValue={["typography", "layout", "spacing", "appearance"]}
                  className="w-full"
                >
                  {(element?.type === "heading" || element?.type === "paragraph" || element?.type === "button") && (
                    <AccordionItem value="typography" className="border-zinc-800">
                      <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100">
                        <div className="flex items-center">
                          <Type className="mr-2 h-4 w-4 text-zinc-400" />
                          Typography
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-zinc-400">Font</label>
                              <select
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                                value={element?.styles.fontFamily || "sans-serif"}
                                onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
                              >
                                <option value="sans-serif">Sans Serif</option>
                                <option value="serif">Serif</option>
                                <option value="monospace">Monospace</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-zinc-400">Size</label>
                              <div className="flex">
                                <Input
                                  type="text"
                                  value={element?.styles.fontSize?.replace("px", "") || "16"}
                                  className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                                  onChange={(e) => handleStyleChange("fontSize", `${e.target.value}px`)}
                                />
                                <select
                                  className="h-7 rounded-md border border-zinc-700 bg-zinc-800 px-2 text-xs ml-1 text-zinc-100"
                                  value="px"
                                >
                                  <option value="px">px</option>
                                  <option value="em">em</option>
                                  <option value="rem">rem</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-medium text-zinc-400">Weight</label>
                            <select
                              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                              value={element?.styles.fontWeight || "normal"}
                              onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                            >
                              <option value="normal">Regular</option>
                              <option value="500">Medium</option>
                              <option value="bold">Bold</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-medium text-zinc-400">Color</label>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <Input
                                  type="text"
                                  value={element?.styles.color || "#ffffff"}
                                  className="h-7 text-xs pl-8 bg-zinc-800 border-zinc-700 text-zinc-100"
                                  onChange={(e) => handleStyleChange("color", e.target.value)}
                                />
                                <div
                                  className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full border border-zinc-600"
                                  style={{ backgroundColor: element?.styles.color || "#ffffff" }}
                                ></div>
                              </div>
                              <Input
                                type="color"
                                value={element?.styles.color || "#ffffff"}
                                className="h-7 w-9 p-0 border-0 bg-transparent"
                                onChange={(e) => handleStyleChange("color", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-medium text-zinc-400">Alignment</label>
                            <div className="flex">
                              <Button
                                variant="outline"
                                size="icon"
                                className={cn(
                                  "h-7 w-7 rounded-r-none border-zinc-700 bg-zinc-800 text-zinc-400",
                                  element?.styles.textAlign === "left" && "bg-zinc-700 text-zinc-100",
                                )}
                                onClick={() => handleStyleChange("textAlign", "left")}
                              >
                                <AlignLeft className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className={cn(
                                  "h-7 w-7 rounded-none border-l-0 border-zinc-700 bg-zinc-800 text-zinc-400",
                                  element?.styles.textAlign === "center" && "bg-zinc-700 text-zinc-100",
                                )}
                                onClick={() => handleStyleChange("textAlign", "center")}
                              >
                                <AlignCenter className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className={cn(
                                  "h-7 w-7 rounded-none border-l-0 border-zinc-700 bg-zinc-800 text-zinc-400",
                                  element?.styles.textAlign === "right" && "bg-zinc-700 text-zinc-100",
                                )}
                                onClick={() => handleStyleChange("textAlign", "right")}
                              >
                                <AlignRight className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className={cn(
                                  "h-7 w-7 rounded-l-none border-l-0 border-zinc-700 bg-zinc-800 text-zinc-400",
                                  element?.styles.textAlign === "justify" && "bg-zinc-700 text-zinc-100",
                                )}
                                onClick={() => handleStyleChange("textAlign", "justify")}
                              >
                                <AlignJustify className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  <AccordionItem value="layout" className="border-zinc-800">
                    <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100">
                      <div className="flex items-center">
                        <Grid className="mr-2 h-4 w-4 text-zinc-400" />
                        Layout
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-zinc-400">Display</label>
                          <select
                            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                            value={element?.styles.display || "block"}
                            onChange={(e) => handleStyleChange("display", e.target.value)}
                          >
                            <option value="block">Block</option>
                            <option value="flex">Flex</option>
                            <option value="grid">Grid</option>
                            <option value="none">None</option>
                          </select>
                        </div>

                        {element?.styles.display === "flex" && (
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-zinc-400">Direction</label>
                            <select
                              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
                              value={element?.styles.flexDirection || "row"}
                              onChange={(e) => handleStyleChange("flexDirection", e.target.value)}
                            >
                              <option value="row">Row</option>
                              <option value="column">Column</option>
                            </select>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-zinc-400">Width</label>
                            <div className="flex">
                              <Input
                                type="text"
                                value={element?.styles.width?.replace(/[^0-9]/g, "") || "100"}
                                className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                                onChange={(e) => {
                                  const unit = element?.styles.width?.replace(/[0-9]/g, "") || "%"
                                  handleStyleChange("width", `${e.target.value}${unit}`)
                                }}
                              />
                              <select
                                className="h-7 rounded-md border border-zinc-700 bg-zinc-800 px-2 text-xs ml-1 text-zinc-100"
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
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-zinc-400">Height</label>
                            <div className="flex">
                              <Input
                                type="text"
                                value={element?.styles.height?.replace(/[^0-9]/g, "") || "auto"}
                                className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                                onChange={(e) => {
                                  const unit = element?.styles.height?.replace(/[0-9]/g, "") || "px"
                                  handleStyleChange("height", `${e.target.value}${unit}`)
                                }}
                              />
                              <select
                                className="h-7 rounded-md border border-zinc-700 bg-zinc-800 px-2 text-xs ml-1 text-zinc-100"
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
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="spacing" className="border-zinc-800">
                    <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100">
                      <div className="flex items-center">
                        <Box className="mr-2 h-4 w-4 text-zinc-400" />
                        Spacing
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-zinc-400">Margin</label>
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

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-zinc-400">Padding</label>
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
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="appearance" className="border-zinc-800">
                    <AccordionTrigger className="text-sm text-zinc-300 hover:text-zinc-100">
                      <div className="flex items-center">
                        <Sliders className="mr-2 h-4 w-4 text-zinc-400" />
                        Appearance
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-zinc-400">Background Color</label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input
                                type="text"
                                value={element?.styles.backgroundColor || "transparent"}
                                className="h-7 text-xs pl-8 bg-zinc-800 border-zinc-700 text-zinc-100"
                                onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                              />
                              <div
                                className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full border border-zinc-600"
                                style={{ backgroundColor: element?.styles.backgroundColor || "transparent" }}
                              ></div>
                            </div>
                            <Input
                              type="color"
                              value={element?.styles.backgroundColor || "#18181b"}
                              className="h-7 w-9 p-0 border-0 bg-transparent"
                              onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-zinc-400">Border Radius</label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="text"
                              value={element?.styles.borderRadius?.replace("px", "") || "0"}
                              className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
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

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-zinc-400">Border</label>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <span className="text-[10px] text-zinc-500">Width</span>
                              <Input
                                type="text"
                                value={element?.styles.borderWidth?.replace("px", "") || "0"}
                                className="h-7 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                                onChange={(e) => handleStyleChange("borderWidth", `${e.target.value}px`)}
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-zinc-500">Style</span>
                              <select
                                className="h-7 w-full rounded-md border border-zinc-700 bg-zinc-800 px-2 text-xs text-zinc-100"
                                value={element?.styles.borderStyle || "solid"}
                                onChange={(e) => handleStyleChange("borderStyle", e.target.value)}
                              >
                                <option value="solid">Solid</option>
                                <option value="dashed">Dashed</option>
                                <option value="dotted">Dotted</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[10px] text-zinc-500">Color</span>
                              <div className="flex h-7 relative">
                                <div
                                  className="absolute left-1.5 top-1.5 h-4 w-4 rounded-full border border-zinc-600"
                                  style={{ backgroundColor: element?.styles.borderColor || "#3f3f46" }}
                                ></div>
                                <Input
                                  type="color"
                                  value={element?.styles.borderColor || "#3f3f46"}
                                  className="h-7 w-full p-0 opacity-0 absolute"
                                  onChange={(e) => handleStyleChange("borderColor", e.target.value)}
                                />
                                <Input
                                  type="text"
                                  value={element?.styles.borderColor || "#3f3f46"}
                                  className="h-7 text-xs pl-8 bg-zinc-800 border-zinc-700 text-zinc-100"
                                  onChange={(e) => handleStyleChange("borderColor", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {!selectedElement ? (
              <div className="flex h-40 flex-col items-center justify-center text-center text-sm text-zinc-500">
                <Settings className="mb-2 h-10 w-10 opacity-20" />
                <p>Select an element to edit its settings</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-400">Element Name</label>
                  <Input
                    value={element?.name || ""}
                    className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-400">Element ID</label>
                  <Input
                    value={selectedElement}
                    className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-400"
                    disabled
                  />
                </div>

                {(element?.type === "heading" || element?.type === "paragraph" || element?.type === "button") && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-400">Content</label>
                    <textarea
                      value={element?.content || ""}
                      className="w-full h-20 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-100 resize-none"
                      onChange={(e) => handleContentChange(e.target.value)}
                    />
                  </div>
                )}

                {element?.type === "button" && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-400">Link URL</label>
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
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-zinc-400">Image URL</label>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        className="h-8 text-xs bg-zinc-800 border-zinc-700 text-zinc-100"
                        value={element?.src || ""}
                        onChange={(e) => updateElement(selectedElement, { src: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-zinc-400">Alt Text</label>
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
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function for className conditionals
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

