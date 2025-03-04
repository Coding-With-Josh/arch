import { Code2, Star, MoreVertical, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditorCardProps {
  title: string;
  description: string;
  language: string;
  lastEdited: string;
  tags?: string[];
  stars?: number;
  views?: number;
}

export function EditorCard({
  title,
  description,
  language,
  lastEdited,
  tags = [],
  stars = 0,
  views = 0,
}: EditorCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900 hover:shadow-lg">
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
            <DropdownMenuContent align="end" className="w-40 bg-zinc-900 border-zinc-800">
              <DropdownMenuItem className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-zinc-800 hover:text-red-300">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{description}</p>
      
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-zinc-800/50 px-2 py-0.5 text-xs text-zinc-400">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-zinc-500">
            <Star className="h-3 w-3" />
            {stars}
          </div>
          <div className="flex items-center gap-1 text-zinc-500">
            <Eye className="h-3 w-3" />
            {views}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-zinc-800/50 px-2 py-1 font-medium text-zinc-300">
            {language}
          </div>
          <span className="flex items-center gap-1 text-zinc-500">
            <Calendar className="h-3 w-3" />
            {lastEdited}
          </span>
        </div>
      </div>
    </div>
  );
}