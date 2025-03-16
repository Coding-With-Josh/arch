"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateProjectForm } from "@/components/forms/create-project-form"

export function ProjectDialog({ 
  organizationId, 
  organizationSlug 
}: { 
  organizationId: string
  organizationSlug: string 
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-[500px] border-zinc-800 bg-zinc-900/90 backdrop-blur-sm"
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-zinc-100">Create New Project</DialogTitle>
          <p className="text-sm text-zinc-400">
            Set up a new project to start deploying your applications.
          </p>
        </DialogHeader>
        <CreateProjectForm 
          organizationId={organizationId} 
          organizationSlug={organizationSlug}
          closeDialog={() => {
            const dialogClose = document.getElementById('close-dialog')
            if (dialogClose instanceof HTMLButtonElement) {
              dialogClose.click()
            }
          }}
        />
        <button id="close-dialog" className="hidden" />
      </DialogContent>
    </Dialog>
  )
}
