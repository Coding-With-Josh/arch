

interface EditorCardProps {
    title: string
    description: string
    language: string
    lastEdited: string
  }
  
  export function EditorCard({
    title,
    description,
    language,
    lastEdited,
  }: EditorCardProps) {
    return (
      <div className="group relative overflow-hidden rounded-xl bg-zinc-900 p-6 transition-all hover:bg-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
          <div className="flex gap-2">
            <button className="rounded-md bg-zinc-800 p-2 opacity-0 transition-opacity hover:bg-zinc-700 group-hover:opacity-100">
              <StarIcon className="h-4 w-4 text-zinc-400" />
            </button>
            <button className="rounded-md bg-zinc-800 p-2 opacity-0 transition-opacity hover:bg-zinc-700 group-hover:opacity-100">
              <MenuIcon className="h-4 w-4 text-zinc-400" />
            </button>
          </div>
        </div>
        
        <p className="mt-2 text-sm text-zinc-400">{description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
              {language}
            </div>
            <span className="text-xs text-zinc-500">Last edited {lastEdited}</span>
          </div>
        </div>
      </div>
    )
  }
  
  function StarIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
  
  function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    )
  }
  