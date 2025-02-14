"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { 
  Code2, Database, Blocks, Rocket, 
  Wallet, Shield, BookOpen, FlaskConical,
  BarChart3, Cpu
} from "lucide-react"
import { forwardRef } from "react"

const features = [
  {
    title: "Smart Contracts",
    href: "/features/smart-contracts",
    description: "Build and deploy secure smart contracts with AI assistance",
    icon: Code2
  },
  {
    title: "Web3 Database",
    href: "/features/database",
    description: "Hybrid storage solution for Web2 and Web3 data",
    icon: Database
  },
  {
    title: "dApp Templates",
    href: "/features/templates",
    description: "Production-ready templates for rapid development",
    icon: Blocks
  },
]

const tools = [
  {
    title: "Contract Studio",
    href: "/tools/studio",
    description: "AI-powered smart contract development environment",
    icon: FlaskConical
  },
  {
    title: "Security Scanner",
    href: "/tools/security",
    description: "Automated smart contract auditing and vulnerability detection",
    icon: Shield
  },
  {
    title: "Analytics",
    href: "/tools/analytics",
    description: "Real-time metrics for your dApps and smart contracts",
    icon: BarChart3
  },
]

export function MainNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {features.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {tools.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button 
            variant="ghost" 
            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            asChild
          >
            <NavigationMenuLink href="/docs">
              <BookOpen className="mr-2 h-4 w-4" />
              Documentation
            </NavigationMenuLink>
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button 
            variant="ghost"
            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            asChild
          >
            <NavigationMenuLink href="/pricing">
              <Rocket className="mr-2 h-4 w-4" />
              Pricing
            </NavigationMenuLink>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
    icon: React.ElementType
  }
>(({ className, title, icon: Icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-zinc-800/50 hover:text-zinc-100",
            "focus:bg-zinc-800/50 focus:text-zinc-100",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-blue-500" />
            <div className="text-sm font-medium leading-none text-zinc-100">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
