import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Command } from "cmdk";
import { Search, Package } from "lucide-react";
import { usePathname } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { editorCommands, dashboardCommands } from "./command/commands";

export function CommandCenter() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const pathname = usePathname();
  const isEditorPage = pathname?.includes("/studio/editor");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const commands = isEditorPage ? editorCommands : dashboardCommands;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="fixed inset-0 bg-zinc-950/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="fixed left-[50%] top-[50%] w-full max-w-[640px] -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.95, y: "-45%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: "-45%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Command
              className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-2xl backdrop-blur-xl"
              loop
            >
              <div className="flex items-center border-b border-zinc-800 px-3">
                <Search className="h-4 w-4 text-zinc-400" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent py-4 px-2 text-sm outline-none placeholder:text-zinc-500 text-zinc-100"
                />
              </div>

              <Command.List className="max-h-[400px] overflow-hidden overflow-y-auto scrollbar-none">
                <ScrollArea className="px-3 py-2">
                  <div className="space-y-2">
                    {commands.map((group) => (
                      <Command.Group
                        key={group.group}
                        heading={
                          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 px-2 py-1">
                            <group.icon className={`h-3.5 w-3.5 ${group.color}`} />
                            {group.group}
                          </div>
                        }
                      >
                        {group.items.map((item) => (
                          item.link ? (
                            <Link href={item.link} key={item.link}>
                              <CommandItem {...item} onSelect={() => runCommand(item.action)} />
                            </Link>
                          ) : (
                            <CommandItem key={item.title} {...item} onSelect={() => runCommand(item.action)} />
                          )
                        ))}
                      </Command.Group>
                    ))}
                  </div>
                </ScrollArea>
              </Command.List>

              <div className="border-t border-zinc-800 p-2">
                <div className="flex items-center justify-between px-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Package className="h-3.5 w-3.5" />
                    <span>Arch Studio</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
                      ⌘
                    </kbd>
                    <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
                      K
                    </kbd>
                  </div>
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CommandItem({
  icon: Icon,
  title,
  subtitle,
  shortcut,
  onSelect,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  shortcut?: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="group relative flex items-center gap-3 rounded-lg px-2 py-3 text-sm outline-none aria-selected:bg-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800/50 text-zinc-400 group-aria-selected:bg-zinc-700 group-aria-selected:text-zinc-100">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-zinc-100">{title}</span>
        {subtitle && <span className="text-xs text-zinc-400">{subtitle}</span>}
      </div>
      {shortcut && (
        <kbd className="pointer-events-none absolute right-2 top-[50%] -translate-y-[50%] rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
          {shortcut}
        </kbd>
      )}
    </Command.Item>
  );
}
