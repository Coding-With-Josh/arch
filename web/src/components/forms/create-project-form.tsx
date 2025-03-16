"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ProjectType } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(1).max(50),
  slug: z.string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and dashes"
    }),
  type: z.nativeEnum(ProjectType),
  repository: z.string().url().optional().or(z.literal("")),
})

export function CreateProjectForm({ 
  organizationId, 
  organizationSlug,
  closeDialog
}: { 
  organizationId: string
  organizationSlug: string 
  closeDialog?: () => void
}) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      type: ProjectType.WEB,
      repository: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          organizationId,
        }),
      })

      if (!response.ok) throw new Error('Failed to create project')

      router.refresh()
      closeDialog?.()
      router.push(`/dashboard/organizations/${organizationSlug}/projects/${values.slug}`)
    } catch (error) {
      console.error('Failed to create project:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-300">Project Name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="My awesome project" 
                                    {...field} 
                                    className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-blue-600"
                                />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-300">Project URL Slug</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="my-awesome-project"
                                    {...field}
                                    className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-blue-600"
                                    onChange={e => {
                                        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                                        field.onChange(value)
                                    }}
                                />
                            </FormControl>
                            <p className="text-xs text-zinc-500 mt-1">
                                This will be used in the URL: /projects/<span className="text-zinc-400">{field.value || 'slug'}</span>
                            </p>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-300">Project Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="border-zinc-800 bg-zinc-900 text-zinc-100 focus:ring-blue-600">
                                        <SelectValue placeholder="Select a project type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="border-zinc-800 bg-zinc-900 text-zinc-100">
                                    {Object.values(ProjectType).map((type) => (
                                        <SelectItem 
                                            key={type} 
                                            value={type}
                                            className="focus:bg-zinc-800 focus:text-zinc-100"
                                        >
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="repository"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-300">Repository URL (optional)</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="https://github.com/..." 
                                    {...field} 
                                    className="border-zinc-800 bg-zinc-900 text-zinc-100 focus-visible:ring-blue-600"
                                />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors" 
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Project'}
                </Button>
            </form>
        </Form>
  )
}
