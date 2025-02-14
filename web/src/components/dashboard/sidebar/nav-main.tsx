"use client"

import { mainNavigation } from "@/config/navigation"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain() {
  const pathname = usePathname()

  return (
    <>
      {mainNavigation.map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={pathname.startsWith(item.href)}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "group w-full transition-colors duration-200",
                        pathname === item.href && "bg-zinc-800 text-zinc-100"
                      )}
                    >
                      {item.icon && (
                        <item.icon className={cn(
                          "size-4 transition-all duration-200",
                          "group-hover:scale-110 group-hover:text-zinc-100",
                          pathname === item.href ? "text-zinc-100" : "text-zinc-400"
                        )} />
                      )}
                      <span>{item.title}</span>
                      {item.items && (
                        <ChevronRight className="ml-auto size-4 transition-transform duration-200" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.href}>
                            <SidebarMenuSubButton
                              href={subItem.href}
                              isActive={pathname === subItem.href}
                            >
                              {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
