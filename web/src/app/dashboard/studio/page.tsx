import { EditorCard } from "@/components/studio/editor-card";
import { Button } from "@/components/ui/button";

export default function EditorsPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-400">Welcome to your dashboard</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700">
            All Editors
          </Button>
          <Button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700">
            Recent
          </Button>
          <Button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700">
            Favorites
          </Button>
        </div>
        <Button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-500">
          New Editor
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Example editor cards */}
        <EditorCard
          title="React Playground"
          description="A sandbox for testing React components"
          language="TypeScript"
          lastEdited="2h ago"
        />
        <EditorCard
          title="CSS Experiments"
          description="Testing new CSS features and animations"
          language="CSS"
          lastEdited="1d ago"
        />
        {/* Add more cards as needed */}
      </div>
    </div>
  );
}
