import { cn } from "@/lib/utils"

const Page = () => {
    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-zinc-950 text-white font-mono">
            <header className="border-b border-zinc-800 bg-zinc-900 bg-card px-4 py-2">
                <span>Untitled-1</span>
            </header>
            
            <main 
                className="flex-1 p-4 outline-none whitespace-pre-wrap"
                contentEditable={true}
                suppressContentEditableWarning={true}
                spellCheck={false}
            />
            
            <footer className="border-t border-border bg-primary px-4 py-1">
                <span className="text-xs text-primary-foreground">JavaScript</span>
            </footer>
        </div>
    )
}

export default Page
