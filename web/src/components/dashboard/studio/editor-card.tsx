import { Star, MoreVertical, Code2, Calendar } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface EditorCardProps {
  title: string;
  description: string;
  language: string;
  lastEdited: string;
  tags?: string[];
}

export function EditorCard({
  title,
  description,
  language,
  lastEdited,
  tags = [],
}: EditorCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:bg-zinc-800/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-zinc-500" />
          <h3 className="text-base font-medium text-zinc-100">{title}</h3>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 transition-opacity hover:bg-zinc-800 group-hover:opacity-100"
          >
            <Star className="h-4 w-4 text-zinc-400" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 transition-opacity hover:bg-zinc-800 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4 text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
              <DropdownMenuItem className="hover:bg-zinc-800">Edit</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800">Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800">Share</DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-zinc-800">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
      
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-zinc-800/50 px-2 py-0.5 text-xs text-zinc-400">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300">
            {language}
          </div>
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <Calendar className="h-3 w-3" />
            {lastEdited}
          </span>
        </div>
      </div>
    </div>
  );
}
