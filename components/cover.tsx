"use client"

import { cn } from "@/lib/utils";

interface CoverImageProps {
    url?: string;
    preview?:boolean;
}

const Cover = ({
    url,
    preview
}: CoverImageProps) => {
    return ( 
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {}
        </div>
     );
}
 
export default Cover;