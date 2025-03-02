import {
  FileIcon,
  Terminal,
  Bot,
  GitBranch,
  Play,
  Bug,
  Settings2,
  Search,
  Save,
  Plus,
  FolderPlus,
  Users,
  Layout,
  WalletCards,
  Box,
  Boxes,
  Share2,
  Sparkles,
  CodeIcon
} from "lucide-react"
 
export const editorCommands = [
  {
    group: "File",
    icon: FileIcon,
    color: "text-blue-400",
    items: [
      {
        icon: Plus,
        link: "#",
        title: "New File",
        subtitle: "Create a new file",
        shortcut: "⌘N",
        action: () => console.log("new file")
      },
      {
        icon: FolderPlus,
        title: "New Folder",
        subtitle: "Create a new folder",
        link: "#",
        shortcut: "⌘⇧N",
        action: () => console.log("new folder")
      },
      {
        icon: Save,
        title: "Save File",
        subtitle: "Save current file",
        link: "#",
        shortcut: "⌘S",
        action: () => console.log("save file")
      },
    ]
  },
  {
    group: "Tools",
    icon: Terminal,
    color: "text-green-400",
    items: [
      {
        icon: Terminal,
        title: "Toggle Terminal",
        subtitle: "Show/hide terminal panel",
        link: "#",
        shortcut: "⌘J",
        action: () => console.log("toggle terminal")
      },
      {
        icon: Search,
        title: "Find in Files",
        link: "#",
        subtitle: "Search across project",
        shortcut: "⌘⇧F",
        action: () => console.log("find in files")
      },
      {
        icon: Settings2,
        title: "Editor Settings",
        link: "#",
        subtitle: "Configure editor",
        action: () => console.log("settings")
      },
    ]
  },
  {
    group: "Development",
    icon: Bug,
    color: "text-amber-400",
    items: [
      {
        icon: Play,
        title: "Run Project",
        subtitle: "Start development server",
        link: "#",
        shortcut: "⌘R",
        action: () => console.log("run project")
      },
      {
        icon: Bug,
        title: "Debug",
        subtitle: "Start debugging",
        link: "#",
        shortcut: "F5",
        action: () => console.log("debug")
      },
      {
        icon: GitBranch,
        title: "Git Commands",
        link: "#",
        subtitle: "Source control actions",
        action: () => console.log("git")
      },
    ]
  },
  {
    group: "AI Assistant",
    icon: Sparkles,
    color: "text-purple-400",
    items: [
      {
        icon: Bot,
        title: "Generate Code",
        subtitle: "AI code generation",
        link: "#",
        shortcut: "⌘⇧G",
        action: () => console.log("generate code")
      },
      {
        icon: Bot,
        title: "Explain Code",
        link: "#",
        subtitle: "Get code explanation",
        action: () => console.log("explain code")
      },
      {
        icon: Bot,
        link: "#",
        title: "Fix Issues",
        subtitle: "AI code fixes",
        action: () => console.log("fix code")
      },
    ]
  }
]

export const dashboardCommands = [
  {
    group: "Projects",
    icon: Box,
    color: "text-blue-400",
    items: [
      {
        icon: Plus,
        title: "New Project",
        subtitle: "Create a new project",
        link: "#",
        shortcut: "⌘N",
        action: () => console.log("new project")
      },
      {
        icon: Share2,
        title: "Share Project",
        subtitle: "Invite collaborators",
        link: "#",
        action: () => console.log("share project")
      },
      {
        icon: Settings2,
        title: "Project Settings",
        subtitle: "Configure project",
        link: "#",
        action: () => console.log("project settings")
      },
      {
        icon: CodeIcon,
        title: "Go to Studio",
        subtitle: "View all editors in this project",
        link: "/dashboard/studio",
        action: () => console.log("go to studio")
      },
    ]
  },
  {
    group: "Team",
    icon: Users,
    color: "text-green-400",
    items: [
      {
        icon: Users,
        title: "Invite Members",
        subtitle: "Add team members",
        link: "#",

        action: () => console.log("invite members")
      },
      {
        icon: Layout,
        title: "Manage Roles",
        subtitle: "Update permissions",
        link: "#",

        action: () => console.log("manage roles")
      },
    ]
  },
  {
    group: "Workspace",
    icon: Boxes,
    color: "text-purple-400",
    items: [
      {
        icon: WalletCards,
        title: "Billing",
        subtitle: "Manage subscription",
        action: () => console.log("billing"),
        link: "#",

      },
      {
        icon: Settings2,
        link: "#",

        title: "Settings",
        subtitle: "Workspace preferences",
        action: () => console.log("settings")
      },
    ]
  }
]
