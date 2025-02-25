"use client"

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  SandpackConsole,
} from "@codesandbox/sandpack-react"

export default function EditorSandbox() {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-zinc-950">
      <SandpackProvider
      
        theme="dark"
        template="react"
        options={{
          recompileMode: "delayed",
          recompileDelay: 500,
          classes: {
            'sp-wrapper': 'h-full w-full border-none bg-transparent',
            'sp-layout': 'h-full w-full border-none bg-transparent',
            'sp-stack': 'h-full w-full border-none bg-transparent',
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
        <div className="h-screen w-screen flex flex-col">
          <SandpackLayout className="flex-1">
            <div className="h-full flex w-full">
              <SandpackFileExplorer 
                className="max-w-[22rem] border-r border-zinc-800/50"
                
              />    
              <div className="flex-1 flex flex-col h-full">
                <SandpackCodeEditor
                  showInlineErrors
                  showLineNumbers
                  showTabs
                  showRunButton
                  className="flex-1 min-w-[50rem]"
                  closableTabs
                />
                {/* <SandpackConsole
                  showHeader
                  showSetupProgress
                  className="h-48 border-t border-zinc-800/50"
                /> */}
              </div>
              <SandpackPreview 
                showNavigator
                showOpenNewtab
                className="border-l border-zinc-800/50"
              />
            </div>
          </SandpackLayout>
        </div>
      </SandpackProvider>
    </div>
  )
}
