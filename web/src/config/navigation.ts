import {
  LayoutDashboard,
  Building2,
  Boxes,
  Database,
  Code2,
  Webhook,
  ShieldCheck,
  CreditCard,
  Settings,
  Activity,
  Wallet,
  Network,
  GitBranch,
  Bot,
  Lock,
  BarChart3,
  Users,
  FileCode,
  Server,
  Terminal,
  History,
  PlayCircle,
  ScanLine
} from "lucide-react"

const organizationNavigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard/organizations/[organizationSlug]",
        icon: LayoutDashboard
      },
      {
        title: "Projects",
        href: "/dashboard/organizations/[organizationSlug]/projects",
        icon: Boxes
      },
      {
        title: "Team",
        href: "/dashboard/organizations/[organizationSlug]/team",
        icon: Users
      },
      {
        title: "Activity",
        href: "/dashboard/organizations/[organizationSlug]/activity",
        icon: Activity
      }
    ]
  },
  {
    title: "Settings",
    items: [
      {
        title: "General",
        href: "/dashboard/organizations/[organizationSlug]/settings",
        icon: Settings
      },
      {
        title: "Billing",
        href: "/dashboard/organizations/[organizationSlug]/billing",
        icon: CreditCard
      },
      {
        title: "Security",
        href: "/dashboard/organizations/[organizationSlug]/security",
        icon: ShieldCheck
      },
      {
        title: "API Keys",
        href: "/dashboard/organizations/[organizationSlug]/api-keys",
        icon: Webhook
      }
    ]
  }
]

const projectNavigation = [
  {
    title: "Project",
    items: [
      {
        title: "Overview",
        href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]",
        icon: LayoutDashboard
      },
      {
        title: "Contracts",
        href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/contracts",
        icon: FileCode,
        items: [
          {
            title: "Editor",
            href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/contracts/editor",
            icon: Code2
          },
          {
            title: "Deployments",
            href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/contracts/deployments",
            icon: Server
          }
        ]
      },
      {
        title: "Development",
        href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/development",
        icon: Terminal,
        items: [
          {
            title: "Sandboxes",
            href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/development/sandboxes",
            icon: PlayCircle
          },
          {
            title: "Version Control",
            href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/development/repos",
            icon: GitBranch
          }
        ]
      },
      {
        title: "Security",
        href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/security",
        icon: ShieldCheck,
        items: [
          {
            title: "Audit Scanner",
            href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/security/scanner",
            icon: ScanLine
          },
          {
            title: "History",
            href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/security/history",
            icon: History
          }
        ]
      }
    ]
  },
  {
    title: "Settings",
    items: [
      {
        title: "General",
        href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/settings",
        icon: Settings
      },
      {
        title: "Integrations",
        href: "/dashboard/organizations/[organizationSlug]/projects/[projectSlug]/integrations",
        icon: Webhook
      }
    ]
  }
]

// Helper function to replace URL parameters
const replaceUrlParams = (href: string, params: Record<string, string>) => {
  let url = href
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`[${key}]`, value)
  })
  return url
}

export {
  organizationNavigation,
  projectNavigation,
  replaceUrlParams
}

export type NavigationItem = {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  items?: NavigationItem[];
}

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
}
