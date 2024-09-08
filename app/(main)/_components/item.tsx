"use client";


import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

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
    const ChevronIcon = expanded ? ChevronDown : ChevronRight
    return ( 
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: `${(level * 12) + 12}px` }}
            className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
        >
            <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground"/>
            <span>
                {label}
            </span>
        </div>
     );
}
 
export default Item;