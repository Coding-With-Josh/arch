import {
  Search,
  Plus,
  SlidersHorizontal,
  Clock,
  Star,
  Share2,
  ChevronDown,
  Layout,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditorCard } from "@/components/dashboard/studio/editor-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function EditorsPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top sticky header */}
      <div className="sticky top-0 z-10 border-b border-zinc-800/40 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto max-w-[1400px] px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Studio</h1>
              <p className="text-sm text-zinc-400">Welcome to your Arch Studio</p>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-500" size="sm">
              <Plus className="h-4 w-4" />
              New Editor
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Search and filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                type="search"
                placeholder="Search editors..."
                className="w-full border-zinc-800 bg-zinc-900 pl-9 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
              />
            </div>
            <div className={cn(
              "flex flex-wrap items-center gap-2",
              "scrollbar-none -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
            )}>
              <Button size="sm" className="gap-2 text-zinc-400 hover:text-zinc-100 border-zinc-800 bg-zinc-400/90 backdrop-blur-md">
                <Layout className="h-4 w-4" /> All
              </Button>
              <Button size="sm" className="gap-2 text-zinc-400 hover:text-zinc-100 border-zinc-800 bg-zinc-400/90 backdrop-blur-md">
                <Clock className="h-4 w-4" /> Recent
              </Button>
              <Button size="sm" className="gap-2 text-zinc-400 hover:text-zinc-100 border-zinc-800 bg-zinc-400/90 backdrop-blur-md">
                <Star className="h-4 w-4" /> Favorites
              </Button>
              <Button size="sm" className="gap-2 text-zinc-400 hover:text-zinc-100 border-zinc-800 bg-zinc-400/90 backdrop-blur-md">
                <Share2 className="h-4 w-4" /> Shared
              </Button>
            </div>
          </div>

          {/* Sort and filter bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                  >
                    Sort: Last Updated <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                  <DropdownMenuItem className="hover:bg-zinc-800">Last Updated</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-zinc-800">Name</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-zinc-800">Created</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                title: "React Components",
                description: "Modern React component library with TypeScript",
                language: "TypeScript",
                lastEdited: "2h ago",
                tags: ["react", "ui"]
              },
              {
                title: "Animation Library",
                description: "CSS and JS animations for web applications",
                language: "JavaScript",
                lastEdited: "1d ago",
                tags: ["animation"]
              },
              {
                title: "API Integration",
                description: "REST API integration examples",
                language: "TypeScript",
                lastEdited: "3d ago",
                tags: ["api"]
              },
              {
                title: "Dashboard UI",
                description: "Admin dashboard components and layouts",
                language: "React",
                lastEdited: "1w ago",
                tags: ["ui"]
              },
              {
                title: "Utils Collection",
                description: "Common utility functions and helpers",
                language: "TypeScript",
                lastEdited: "2w ago",
                tags: ["utils"]
              },
              {
                title: "Design System",
                description: "Core design system components",
                language: "React",
                lastEdited: "3w ago",
                tags: ["design"]
              }
            ].map((editor, i) => (
              <EditorCard key={i} {...editor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
