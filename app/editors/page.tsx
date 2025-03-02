import { EditorCard } from '@/components/editors/editor-card'

export default function EditorsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100">My Editors</h1>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700">
                All Editors
              </button>
              <button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700">
                Recent
              </button>
              <button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700">
                Favorites
              </button>
            </div>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-500">
              New Editor
            </button>
          </div>
        </header>

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
    </div>
  )
}
