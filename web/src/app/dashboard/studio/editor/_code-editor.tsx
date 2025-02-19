import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {FileExplorerNav} from "./file-explorer-nav";
import { AI } from "./ai";
import { CodeArea } from "./code-area";


const fileStructure = [
  {
    id: "app",
    name: "app",
    type: "folder",
    items: [
      {
        id: "layout",
        name: "layout.js",
        type: "file",
      },
      {
        id: "marketing",
        name: "(marketing)",
        type: "folder",
        items: [
          {
            id: "about",
            name: "about",
            type: "folder",
            path: "/about",
            items: [
              {
                id: "about-page",
                name: "page.js",
                type: "file",
              },
            ],
          },
          {
            id: "blog",
            name: "blog",
            type: "folder",
            path: "/blog",
            items: [
              {
                id: "blog-page",
                name: "page.js",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        id: "shop",
        name: "(shop)",
        type: "folder",
        items: [
          {
            id: "account",
            name: "account",
            type: "folder",
            path: "/account",
            items: [
              {
                id: "account-page",
                name: "page.js",
                type: "file",
              },
            ],
          },
        ],
      },
    ],
  },
]

export default function CodeEditor() {
  return (
    <div className="w-full flex items-center gap-6 justify-between min-h-screen bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black p-8">
            <FileExplorerNav items={fileStructure} />
    <CodeArea />
    <AI />
    </div>
  );
}
