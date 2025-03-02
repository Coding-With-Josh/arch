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
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="fixed left-[33%] top-[50%] w-full max-w-[640px]"
            initial={{ opacity: 0, scale: 0.95, y: "-45%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: "-45%" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Command
              className="relative overflow-hidden rounded-xl border border-zinc-800/50 bg-black/75 shadow-2xl shadow-zinc-950/50 backdrop-blur-2xl"
              loop
            >
              <div className="flex items-center border-b border-zinc-800/50 px-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Search className="h-4 w-4" />
                </div>
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent py-4 px-2 text-sm outline-none placeholder:text-zinc-500 text-zinc-100"
                />
              </div>

              <Command.List className="overflow-auto scrollbar-thin max-h-[55vh] custom-scrollbar [&_[cmdk-list-sizer]]:p-4">
                <ScrollArea>
                  <div className="px-1 py-2 space-y-4">
                    {commands.map((group) => (
                      <Command.Group
                        key={group.group}
                        heading={
                          <div className="flex items-center pr-1 gap-2 text-xs font-semibold text-zinc-500">
                            <group.icon className={`h-3 w-3 ${group.color}`} />
                            {group.group}
                          </div>
                        }
                      >
                        {group.items.map((item) =>
                          item.link ? (
                            <Link href={item.link} key={item.link}>
                              <CommandItem
                                key={item.title}
                                onSelect={() => runCommand(item.action)}
                                icon={item.icon}
                                title={item.title}
                                subtitle={item.subtitle}
                                shortcut={item.shortcut}
                              />
                            </Link>
                          ) : (
                            <CommandItem
                              key={item.title}
                              onSelect={() => runCommand(item.action)}
                              icon={item.icon}
                              title={item.title}
                              subtitle={item.subtitle}
                              shortcut={item.shortcut}
                            />
                          )
                        )}
                      </Command.Group>
                    ))}
                  </div>
                </ScrollArea>
              </Command.List>

              <div className="border-t border-zinc-800/50 p-2 backdrop-blur-sm">
                <div className="flex items-center justify-between px-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    <span>Arch Studio v1.0.0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="rounded bg-zinc-800/50 px-1.5 py-0.5 text-xs text-zinc-400">
                      ⌘
                    </kbd>
                    <kbd className="rounded bg-zinc-800/50 px-1.5 py-0.5 text-xs text-zinc-400">
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
      className="group relative flex items-center gap-2 rounded-lg px-2 py-3 text-sm text-zinc-300 hover:bg-gradient-to-br from-zinc-800/50 via-zinc-800/30 to-transparent transition-all duration-300 cursor-pointer custom-scrollbar"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-indigo-400">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-zinc-200">{title}</span>
        {subtitle && <span className="text-xs text-zinc-500">{subtitle}</span>}
      </div>
      {shortcut && (
        <kbd className="pointer-events-none absolute right-2 top-[50%] -translate-y-[50%] rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-xs text-zinc-400 opacity-100 group-hover:border-zinc-700">
          {shortcut}
        </kbd>
      )}
    </Command.Item>
  );
}
