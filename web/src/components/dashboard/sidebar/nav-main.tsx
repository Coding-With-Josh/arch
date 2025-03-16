"use client"

import { usePathname } from "next/navigation"
import {
  organizationNavigation,
  projectNavigation,
  replaceUrlParams,
  type NavigationItem,
  type NavigationSection
} from "@/config/navigation"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
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
  
  // Improved path matching with optional trailing slashes
  const organizationMatch = pathname.match(/\/organizations\/([^\/]+)(?:\/|$)/)
  const projectMatch = pathname.match(/\/projects\/([^\/]+)(?:\/|$)/)
  
  const organizationSlug = organizationMatch?.[1]
  const projectSlug = projectMatch?.[1]
  
  // Determine which navigation to use and early return if no org
  if (!organizationSlug) {
    return null
  }

  const navigation: NavigationSection[] = projectSlug ? projectNavigation : organizationNavigation

  // URL parameters for replacing placeholders
  const urlParams = {
    organizationSlug,
    projectSlug: projectSlug ?? ''
  }

  const getItemUrl = (href: string) => {
    return replaceUrlParams(href, urlParams)
  }

  const isCurrentPath = (href: string) => {
    const processedPath = getItemUrl(href)
    return pathname === processedPath || pathname.startsWith(`${processedPath}/`)
  }

  return (
    <>
      {navigation.map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isCurrentPath(item.href)}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      asChild={!item.items} // Only use asChild if no subitems
                      className={cn(
                        "group w-full transition-colors duration-200",
                        isCurrentPath(item.href) && "bg-zinc-800 text-zinc-100"
                      )}
                    >
                      {!item.items ? (
                        <a href={getItemUrl(item.href)}>
                          {item.icon && (
                            <item.icon className={cn(
                              "size-4 transition-all duration-200",
                              "group-hover:scale-110 group-hover:text-zinc-100",
                              isCurrentPath(item.href) ? "text-zinc-100" : "text-zinc-400"
                            )} />
                          )}
                          <span>{item.title}</span>
                        </a>
                      ) : (
                        <>
                          {item.icon && (
                            <item.icon className={cn(
                              "size-4 transition-all duration-200",
                              "group-hover:scale-110 group-hover:text-zinc-100",
                              isCurrentPath(item.href) ? "text-zinc-100" : "text-zinc-400"
                            )} />
                          )}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto size-4 transition-transform duration-200" />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.href}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isCurrentPath(subItem.href)}
                            >
                              <a href={getItemUrl(subItem.href)}>
                                {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                                <span>{subItem.title}</span>
                              </a>
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
