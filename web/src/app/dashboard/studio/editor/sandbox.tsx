import {
  useActiveCode,
  useSandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackThemeProvider,
  SandpackConsole,
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import { javascript } from "@codemirror/lang-javascript";


const Sandbox = () => {
  return (
    <SandpackProvider
      template="react"
      theme={"auto"}
      files={{
        "/src/index.js": {
          code: `import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
`,
        },
        "/src/App.js": {
          code: `import React from "react";
import "./styles.css";
`,
        },
        "/src/styles.css": {
          code: `body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
`,
        },
      }}
      >
      <SandpackLayout>
        <SandpackFileExplorer/>

        <SandpackCodeEditor
          showInlineErrors
          showLineNumbers
          showTabs
          showRunButton
          className="h-full w-full"
          closableTabs
          additionalLanguages={[
            {
              name: "javascript",
              extensions: [".js"],
              language: javascript(),
            },
          ]}
        />
        <SandpackPreview 
          showNavigator
          showOpenNewtab
        />
        <SandpackConsole
          showHeader
          standalone
          showSetupProgress
        />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default Sandbox;
