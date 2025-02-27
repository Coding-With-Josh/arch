'use client'

import { useEffect, useRef, useState } from 'react'
import { CodeSandbox } from '@codesandbox/sdk'

export default function Sandbox() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sandboxUrl, setSandboxUrl] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!containerRef.current) return

    const initSandbox = async () => {
      try {
        const sdk = new CodeSandbox(process.env.NEXT_PUBLIC_CSB_API_KEY);
        const sandbox = await sdk.sandbox.create();
        setSandboxUrl(sandbox.editorUrl);
      } catch (err) {
        setError('Failed to initialize studio');
        console.error(err);
      }
    }

    initSandbox()
  }, [])

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {sandboxUrl && (
      <iframe 
        src={sandboxUrl}
        className="w-full h-full border-0"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; fullscreen; clipboard-write; clipboard-read; autoplay; display-capture; picture-in-picture; web-share; cross-origin-isolated"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-orientation-lock allow-pointer-lock allow-popups-to-escape-sandbox allow-top-navigation allow-top-navigation-by-user-activation"
      />
      )}
    </div>
  )
}