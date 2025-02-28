'use client'

export default function Sandbox() {
  const embedUrl = "https://codesandbox.io/embed/new?fontsize=14&hidenavigation=1&theme=dark&template=universal"

  return (
    <div className="w-full h-full bg-zinc-900">
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        title="CodeSandbox Universal Editor"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; fullscreen"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        loading="eager"
      />
    </div>
  )
}