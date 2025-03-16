"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateProjectForm } from "@/components/forms/create-project-form"

interface ProjectCreateTriggerProps {
  organizationId: string
  organizationSlug: string
}

export function ProjectCreateTrigger({ organizationId, organizationSlug }: ProjectCreateTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xl border-zinc-800 bg-zinc-900">
        <SheetHeader>
          <SheetTitle className="text-zinc-100">Create New Project</SheetTitle>
          <p className="text-sm text-zinc-400">
            Set up a new project to start deploying your applications.
          </p>
        </SheetHeader>
        <CreateProjectForm 
          organizationId={organizationId} 
          organizationSlug={organizationSlug} 
          onComplete={() => {
            setIsOpen(false)
            router.refresh()
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
