import { Sandpack, SandpackProvider } from "@codesandbox/sandpack-react";
import Sandbox from "./sandbox";

export default function Page() {
  return (
    <SandpackProvider>
      <Sandbox/>
    </SandpackProvider>
  );
}
