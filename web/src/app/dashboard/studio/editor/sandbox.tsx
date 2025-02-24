"use client"

import { Suspense } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer
} from "@codesandbox/sandpack-react"

function SandboxContent() {
  return (
    <SandpackLayout>
      <SandpackFileExplorer />
      <SandpackCodeEditor
        showInlineErrors
        showLineNumbers
        showTabs
        showRunButton
        className="h-full w-full"
        closableTabs
      />
      <SandpackPreview 
        showNavigator
        showOpenNewtab
      />
    </SandpackLayout>
  )
}

export default function Sandbox() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    }>
      <SandpackProvider
        theme="dark"
        template="react"
        options={{
          recompileMode: "delayed",
          recompileDelay: 500,
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
}`,
          },
          "/styles.css": {
            code: `body {
  margin: 0;
  padding: 1rem;
  background: #1a1a1a;
  color: white;
}`,
          },
        }}
      >
        <SandboxContent />
      </SandpackProvider>
    </Suspense>
  )
}
