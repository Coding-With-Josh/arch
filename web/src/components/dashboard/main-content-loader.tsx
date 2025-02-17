export function MainContentLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="size-8 animate-spin rounded-full border-4 border-zinc-800 border-t-zinc-400" />
        <p className="text-sm text-zinc-400">Loading...</p>
      </div>
    </div>
  )
}
