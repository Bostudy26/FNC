"use client";


import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
    DropdownMenu,
    DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";



interface ItemProps {
    id?: Id<"documents">
    documentIcon?: string,
    active?: boolean,
    expanded?: boolean,
    isSearch?: boolean,
    level?: number,
    onExpand?: () => void;
    label: string;
    onClick: () => void;
    icon: LucideIcon;
}

const Item = ({
    id,
    documentIcon,
    active,
    expanded,
    isSearch,
    level = 0,
    onExpand,
    label,
    onClick,
    icon: Icon
}: ItemProps) => {
    const router = useRouter();
    const create = useMutation(api.documents.create)

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
      };

      const OnCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({title: "Untitled" , parentDocument: id})
        .then((documentId) => {
            if(!expanded){
                onExpand?.();
            }
            // router.push(`/documents/${documentId}`);
        });

        toast.promise(promise , {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note",

        })
      }


    const ChevronIcon = expanded ? ChevronDown : ChevronRight
    return ( 
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: `${(level * 12) + 12}px` }}
            className={cn(
                'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5',
                active && 'bg-primary/5 text-primary'
              )}
        >
        {!!id && (
            <div
            role="button"
            className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            onClick={handleExpand}
            >
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
            </div>
        )}
        
        {documentIcon ? (
            <div className="mr-2 shrink-0 text-[18px]">
                {documentIcon}
            </div>
         ) : (
            <Icon className="mr-2 h-[18px] w-[18px] shrink-0 text-muted-foreground" />
        )}
        <span className="truncate">
            {label}        
        </span>
        {isSearch && (
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">
                    Ctrl
                </span>K
            </kbd>
        )}
        {!!id && (
            <div className="ml-auto flex items-center gap-x-2">
                <DropdownMenu>

                </DropdownMenu>
                <div
                    role="button" 
                    onClick={OnCreate}
                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                    <Plus className="h-4 w-4 text-muted-foreground"/>
                </div>
            </div>
        )}
    </div>
    );
}
 
Item.Skeleton = function ItemSkeleton({level} : {level? : number}) {
    return (
        <div
            style={
                {
                    paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
                }
            }
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}

export default Item;