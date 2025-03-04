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
  } from "lucide-react"
  
  export const mainNavigation = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          items: [
            {
              title: "API Usage",
              href: "/dashboard/api-usage",
              icon: BarChart3
            },
            {
              title: "Activity",
              href: "/dashboard/activity",
              icon: Activity
            }
          ]
        },
        {
          title: "Organizations",
          href: "/dashboard/organizations",
          icon: Building2,
          items: [
            {
              title: "Teams",
              href: "/dashboard/organizations/teams",
              icon: Building2
            }
          ]
        }
      ]
    },
    {
      title: "Development",
      items: [
        { 
          title: "Projects",
          href: "/dashboard/projects",
          icon: Boxes,
          items: [
            {
              title: "Smart Contracts",
              href: "/dashboard/projects/contracts",
              icon: Code2
            },
            {
              title: "Deployments",
              href: "/dashboard/projects/deployments",
              icon: Network
            },
            {
              title: "Version Control",
              href: "/dashboard/projects/repos",
              icon: GitBranch
            }
          ]
        },
        {
          title: "Database",
          href: "/dashboard/database",
          icon: Database,
          items: [
            {
              title: "Tables",
              href: "/dashboard/database/tables"
            },
            {
              title: "Web3 Storage",
              href: "/dashboard/database/web3"
            }
          ]
        },
        {
          title: "Arch Studio",
          href: "/dashboard/studio",
          icon: Code2,
          items: [
            {
              title: "Editor",
              href: "/dashboard/studio/editor"
            },
            {
              title: "AI Assistant",
              href: "/dashboard/studio/ai",
              icon: Bot
            }
          ]
        }
      ]
    },
    {
      title: "Security & APIs",
      items: [
        {
          title: "API Gateway",
          href: "/dashboard/api",
          icon: Webhook,
          items: [
            {
              title: "Keys",
              href: "/dashboard/api/keys"
            },
            {
              title: "Usage",
              href: "/dashboard/api/usage"
            }
          ]
        },
        {
          title: "Security",
          href: "/dashboard/security",
          icon: ShieldCheck,
          items: [
            {
              title: "Audit Logs",
              href: "/dashboard/security/logs",
              icon: Activity
            },
            {
              title: "AI Audits",
              href: "/dashboard/security/ai-audits",
              icon: Bot
            }
          ]
        }
      ]
    },
    {
      title: "Account",
      items: [
        {
          title: "Wallet",
          href: "/dashboard/wallet",
          icon: Wallet,
          items: [
            {
              title: "Balances",
              href: "/dashboard/wallet/balances"
            },
            {
              title: "Transactions",
              href: "/dashboard/wallet/transactions"
            }
          ]
        },
        {
          title: "Billing",
          href: "/dashboard/billing",
          icon: CreditCard,
          items: [
            {
              title: "Subscriptions",
              href: "/dashboard/billing/plans"
            },
            {
              title: "Usage",
              href: "/dashboard/billing/usage"
            }
          ]
        },
        {
          title: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
          items: [
            {
              title: "Profile",
              href: "/dashboard/settings/profile"
            },
            {
              title: "Security",
              href: "/dashboard/settings/security",
              icon: Lock
            }
          ]
        }
      ]
    }
  ]
  
  export type NavigationItem = {
    title: string
    href: string
    icon?: any
    items?: NavigationItem[]
  }
  
  export type NavigationSection = {
    title: string
    items: NavigationItem[]
  }
  