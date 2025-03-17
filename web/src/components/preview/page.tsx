import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Preview - WebFlow",
  description: "Preview your website before publishing",
}

export default function PreviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary-foreground"
              >
                <path d="M12 5v14" />
                <path d="M18 13l-6 6" />
                <path d="M6 13l6 6" />
                <path d="M18 11l-6-6" />
                <path d="M6 11l6-6" />
              </svg>
            </div>
            <span className="text-xl font-bold">WebFlow</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Preview Mode</div>
            <Link href="/editor">
              <Button variant="outline" size="sm">
                Back to Editor
              </Button>
            </Link>
            <Button size="sm">Publish</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* This would be the actual preview of the user's website */}
        <div className="container py-8">
          <div className="rounded-lg border bg-card p-8 shadow">
            <h1 className="text-2xl font-bold">Website Preview</h1>
            <p className="text-muted-foreground mt-2">
              This is a preview of your website. In a complete implementation, this would show the actual website you've
              built with the Web Editor, with all the functionality from the Flow Builder.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

