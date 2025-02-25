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
  Sparkles
} from "lucide-react"

export const editorCommands = [
  {
    group: "File",
    icon: FileIcon,
    color: "text-blue-400",
    items: [
      {
        icon: Plus,
        title: "New File",
        subtitle: "Create a new file",
        shortcut: "⌘N",
        action: () => console.log("new file")
      },
      {
        icon: FolderPlus,
        title: "New Folder",
        subtitle: "Create a new folder",
        shortcut: "⌘⇧N",
        action: () => console.log("new folder")
      },
      {
        icon: Save,
        title: "Save File",
        subtitle: "Save current file",
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
        shortcut: "⌘J",
        action: () => console.log("toggle terminal")
      },
      {
        icon: Search,
        title: "Find in Files",
        subtitle: "Search across project",
        shortcut: "⌘⇧F",
        action: () => console.log("find in files")
      },
      {
        icon: Settings2,
        title: "Editor Settings",
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
        shortcut: "⌘R",
        action: () => console.log("run project")
      },
      {
        icon: Bug,
        title: "Debug",
        subtitle: "Start debugging",
        shortcut: "F5",
        action: () => console.log("debug")
      },
      {
        icon: GitBranch,
        title: "Git Commands",
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
        shortcut: "⌘⇧G",
        action: () => console.log("generate code")
      },
      {
        icon: Bot,
        title: "Explain Code",
        subtitle: "Get code explanation",
        action: () => console.log("explain code")
      },
      {
        icon: Bot,
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
        shortcut: "⌘N",
        action: () => console.log("new project")
      },
      {
        icon: Share2,
        title: "Share Project",
        subtitle: "Invite collaborators",
        action: () => console.log("share project")
      },
      {
        icon: Settings2,
        title: "Project Settings",
        subtitle: "Configure project",
        action: () => console.log("project settings")
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
        action: () => console.log("invite members")
      },
      {
        icon: Layout,
        title: "Manage Roles",
        subtitle: "Update permissions",
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
        action: () => console.log("billing")
      },
      {
        icon: Settings2,
        title: "Settings",
        subtitle: "Workspace preferences",
        action: () => console.log("settings")
      },
    ]
  }
]
