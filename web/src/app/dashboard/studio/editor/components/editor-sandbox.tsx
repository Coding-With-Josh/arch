"use client"

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react"

export default function EditorSandbox() {
  return (
    <div className="h-screen w-full bg-zinc-950">
      <SandpackProvider
        theme="dark"
        template="react"
        options={{
          recompileMode: "delayed",
          recompileDelay: 500,
          classes: {
            'sp-wrapper': 'h-full border-none bg-transparent',
            'sp-layout': 'h-full border-none bg-transparent',
            'sp-stack': 'h-full border-none bg-transparent',
          }
        }}
        files={{
          "/App.tsx": {
            code: `export default function App() {
  return (
    <div className="App">
      <h1>Welcome to Arch Studio</h1>
      <p>Start editing to see some magic happen!</p>
    </div>
  );
}`
          },
          "/styles.css": {
            code: `body {
  margin: 0;
  padding: 1rem;
  background: #18181b;
  color: white;
}`
          },
        }}
      >
        <SandpackLayout>
          <SandpackFileExplorer 
            className="border-r border-zinc-800/50"
          />
          <SandpackCodeEditor
            showInlineErrors
            showLineNumbers
            showTabs
            showRunButton
            className="h-full flex-1"
            closableTabs
          />
          <SandpackPreview 
            showNavigator
            showOpenNewtab
            className="border-l border-zinc-800/50"
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
