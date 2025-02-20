import CodeEditor from "./_code-editor";

const Page = () => {
    return (
        <div className="w-screen flex items-center gap-6 justify-between min-h-screen bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black p-8">
            <CodeEditor />
        </div>
    )
}

export default Page
