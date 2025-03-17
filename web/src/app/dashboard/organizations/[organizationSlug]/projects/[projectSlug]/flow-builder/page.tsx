import type { Metadata } from "next"
import { FlowBuilder } from "@/components/flow-builder/flow-builder"

export const metadata: Metadata = {
  title: "Flow Builder - WebFlow",
  description: "Visual flow builder for creating backend logic without code",
}

export default function FlowBuilderPage() {
  return (
    <div className="flex h-screen flex-col">
      <FlowBuilder />
    </div>
  )
}

