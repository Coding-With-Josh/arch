"use client"

import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Breadcrumb({ items, ...props }: React.ComponentPropsWithoutRef<"nav"> & {
  items?: { title: string; href?: string }[]
}) {
  const pathname = usePathname()
  
  // Generate breadcrumbs based on current path if items not provided
  const generatedItems = React.useMemo(() => {
    if (items) return items
    
    const paths = pathname.split('/').filter(Boolean)
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`
      return {
        title: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        href
      }
    })
  }, [pathname, items])

  return (
    <nav aria-label="breadcrumbs" {...props}>
      <ol className="flex items-center gap-1.5">
        <li>
          <Link 
            href="/dashboard" 
            className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {generatedItems.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
            {item.href && index < generatedItems.length - 1 ? (
              <Link
                href={item.href}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                {item.title}
              </Link>
            ) : (
              <span className="text-sm font-medium text-zinc-100">
                {item.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
