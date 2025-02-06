'use client'

import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronDown, Menu, Search } from 'lucide-react'

const docs = [
    {
        title: 'Getting Started',
        items: [
            { title: 'Introduction', href: '#introduction' },
            { title: 'Installation', href: '#installation' },
            { title: 'Quick Start', href: '#quick-start' },
        ],
    },
    {
        title: 'Core Concepts',
        items: [
            { title: 'Architecture', href: '#architecture' },
            { title: 'Components', href: '#components' },
            { title: 'Routing', href: '#routing' },
        ],
    },
    {
        title: 'Advanced Guide',
        items: [
            { title: 'Authentication', href: '#authentication' },
            { title: 'Database', href: '#database' },
            { title: 'Deployment', href: '#deployment' },
        ],
    },
]
export default function DocsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-black">
            <div className="flex">
                {/* Mobile sidebar toggle */}
                <Button
                    variant="ghost"
                    className="lg:hidden fixed top-4 left-4 z-50 hover:bg-gray-800/50 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <Menu className="h-4 w-4 text-gray-200" />
                </Button>

                {/* Sidebar */}
                <div
                    className={cn(
                        'w-72 border-r border-gray-800/60 bg-gray-950/95 backdrop-blur-xl fixed left-0 top-0 h-screen lg:static transition-all duration-300 ease-in-out z-40',
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    )}
                >
                    <ScrollArea className="h-full py-6 px-4">
                        <div className="mb-8 space-y-4">
                            <h2 className="text-2xl font-bold text-white/90 px-2">Documentation</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search docs..."
                                    className="w-full bg-gray-900/50 text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-800/60 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 text-gray-300 placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                        <nav>
                            {docs.map((section, i) => (
                                <div key={i} className="mb-6">
                                    <h3 className="font-medium mb-2 text-gray-200 px-2 text-sm tracking-wide">
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-1">
                                        {section.items.map((item, j) => (
                                            <li key={j}>
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center text-gray-400 hover:text-white text-sm px-2 py-1.5 rounded-md hover:bg-gray-800/50 transition-colors"
                                                >
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </ScrollArea>
                </div>

                {/* Main content */}
                <div className="flex-1 min-h-screen bg-gradient-to-b from-gray-950 to-black">
                    <div className="max-w-4xl mx-auto px-6 py-12">
                        <div className="space-y-16">
                            <div>
                                <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Introduction
                                </h1>
                                <p className="text-lg text-gray-300/90 leading-relaxed">
                                    Welcome to our comprehensive documentation. Here you&apos;ll find
                                    everything you need to get started with our platform.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-3xl font-semibold text-white/90">Installation</h2>
                                <p className="text-gray-300/90">
                                    Getting started is easy. Just run the following command:
                                </p>
                                <pre className="bg-gray-900/50 p-4 rounded-xl border border-gray-800/60 overflow-x-auto">
                                    <code className="text-gray-300">npm install @your-package/core</code>
                                </pre>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-3xl font-semibold text-white/90">Quick Start</h2>
                                <p className="text-gray-300/90">
                                    Here&apos;s a simple example to help you get started:
                                </p>
                                <pre className="bg-gray-900/50 p-4 rounded-xl border border-gray-800/60 overflow-x-auto">
                                    <code className="text-gray-300">{`import { YourComponent } from '@your-package/core'

function App() {
    return <YourComponent />
}`}</code>
                                </pre>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-3xl font-semibold text-white/90">Features</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Modern and intuitive API',
                                        'Fully typed with TypeScript',
                                        'Server and client components',
                                        'Accessibility focused'
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center space-x-2 bg-gray-900/30 p-4 rounded-lg border border-gray-800/60"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
