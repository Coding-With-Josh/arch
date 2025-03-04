import { EditorCard } from "@/components/dashboard/studio/editor-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code2,
  Search,
  Layout,
  Clock,
  Star,
  Share2,
  Activity,
  Users,
  GitBranch,
  Plus,
} from "lucide-react";
import Link from "next/link";

const mockEditors = [
  {
    title: "Next.js Dashboard",
    description: "Admin dashboard template with dark mode",
    language: "TypeScript",
    lastEdited: "2h ago",
    tags: ["next.js", "react", "dashboard"],
    stars: 12,
    views: 234,
  },
  {
    title: "API Routes",
    description: "Collection of API route handlers and middleware",
    language: "TypeScript",
    lastEdited: "1d ago",
    tags: ["api", "backend"],
    stars: 8,
    views: 156,
  },
  {
    title: "Auth System",
    description: "Authentication and authorization implementation",
    language: "TypeScript",
    lastEdited: "3d ago",
    tags: ["auth", "security"],
    stars: 15,
    views: 320,
  },
];

export default function StudioPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] space-y-6 py-2 px-2">
      <div>
        <h1 className="text-2xl font-semibold text-white">Studio</h1>
        <p className="text-sm text-zinc-400">Welcome to your Arch Studio</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">
              Total Editors
            </CardTitle>
            <Code2 className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-zinc-500">+3 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">
              Active Editors
            </CardTitle>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-zinc-500">+1 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">
              Collaborators
            </CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">15</div>
            <p className="text-xs text-zinc-500">+2 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-200">
              Saved Changes
            </CardTitle>
            <GitBranch className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">132</div>
            <p className="text-xs text-zinc-500">+22 from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search editors..."
            className="pl-9 border-zinc-800 bg-zinc-900/50 text-zinc-200"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          >
            <Layout className="mr-2 h-4 w-4" /> All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          >
            <Clock className="mr-2 h-4 w-4" /> Recent
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          >
            <Star className="mr-2 h-4 w-4" /> Favorites
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            <Share2 className="mr-2 h-4 w-4" /> Shared
          </Button>
          {/* <Button className="bg-indigo-600 hover:bg-indigo-500">
            <Plus className="mr-2 h-4 w-4" /> New Editor
          </Button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockEditors.map((editor, i) => (
          <>
            <EditorCard key={i} {...editor} />
          </>
        ))}
            <Link href="/dashboard/studio/editor">
            <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900 hover:shadow-lg">
              <div
                className="
                flex items-center justify-center gap-3
            "
              >
                <Plus className="h-6 w-6 text-zinc-500" />
                <h3 className="font-medium text-zinc-300">
                  New Editor
                </h3>
              </div>
            </div>
            </Link>
      </div>
    </div>
  );
}
