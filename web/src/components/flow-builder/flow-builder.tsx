"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FlowCanvas } from "@/components/flow-builder/flow-canvas"
import { FlowBuilderHeader } from "@/components/flow-builder/flow-builder-header"
import { NodePanel } from "@/components/flow-builder/node-panel"

export function FlowBuilder() {
  const router = useRouter()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const handleSwitchToWebEditor = () => {
    router.push("/editor")
  }

  return (
    <div className="flex h-full flex-col">
      <FlowBuilderHeader onSwitchToWebEditor={handleSwitchToWebEditor} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Node Library */}
        <NodePanel selectedNode={selectedNode} onSelectNode={setSelectedNode} />

        {/* Main Canvas */}
        <div className="flex-1 overflow-auto bg-muted/30 p-4">
          <FlowCanvas selectedNode={selectedNode} />
        </div>

        {/* Right Sidebar - Node Configuration */}
        <div className="w-72 border-l bg-background">
          <div className="p-4">
            <h3 className="font-medium">Node Configuration</h3>

            {selectedNode ? (
              <div className="mt-4 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Node Name</label>
                  <Input
                    value={selectedNode === "trigger" ? "Start Workflow" : "Check Client Source"}
                    className="h-8 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={selectedNode === "trigger" ? "Workflow entry point" : "Determine the source of the customer"}
                    className="h-8 text-sm"
                  />
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="general">
                    <AccordionTrigger className="text-sm">General Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label className="text-xs font-medium">ID</label>
                          <Input value="node-1" className="h-7 text-xs" readOnly />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium">Type</label>
                          <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-xs">
                            <option>Conditional</option>
                            <option>Action</option>
                            <option>Trigger</option>
                          </select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="conditional">
                    <AccordionTrigger className="text-sm">Conditional Settings</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label className="text-xs font-medium">Data Source</label>
                          <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-xs">
                            <option>Select Data Source</option>
                            <option>Client Source</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium">Client Type</label>
                          <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-xs">
                            <option>Select Client Type</option>
                            <option>Partner Website</option>
                            <option>Our Website</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium">Conditions</label>
                          <div className="rounded-md border p-2">
                            <div className="flex items-center gap-2 text-xs">
                              <span>If</span>
                              <select className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                                <option>Client Source</option>
                              </select>
                              <span>is</span>
                              <select className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                                <option>Partner Website</option>
                                <option>Our Website</option>
                              </select>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2 h-7 w-full text-xs">
                            <Plus className="mr-1 h-3 w-3" />
                            Add Condition
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="timeout">
                    <AccordionTrigger className="text-sm">Timeout Settings</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="timeout" className="h-4 w-4 rounded border-gray-300" />
                          <label htmlFor="timeout" className="text-xs">
                            Enable Timeout
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-xs font-medium">Duration</label>
                            <Input type="number" value="2" className="h-7 text-xs" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-medium">Unit</label>
                            <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-xs">
                              <option>Minutes</option>
                              <option>Hours</option>
                              <option>Days</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium">Action on Timeout</label>
                          <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-xs">
                            <option>Send Notification</option>
                            <option>Skip Node</option>
                            <option>End Workflow</option>
                          </select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center text-center text-sm text-muted-foreground mt-8">
                <Workflow className="mb-2 h-10 w-10 opacity-20" />
                <p>Select a node to configure</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

