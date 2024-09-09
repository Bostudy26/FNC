"use client"
import { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import TextareaAutosize from 'react-textarea-autosize';

import { Doc } from "@/convex/_generated/dataModel"
import { Button } from "./ui/button";
import IconPicker from "./icon-picker";


import { api } from "@/convex/_generated/api";



interface ToolbarProps{
    initailData: Doc<"documents">;
    preview?: boolean;
};

const Toolbar = ({
    initailData,
    preview,
}: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initailData.title);

    const update = useMutation(api.documents.update);

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initailData.title);
            inputRef.current?.focus();
        },0)
    };

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initailData._id,
            title: value || "Untitled"
        });
    }

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter"){
            event.preventDefault();
            disableInput();
        }
    };


    return ( 
        <div className="pl-[54px] group relative">
            {!!initailData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker
                        onChange={() => {}}
                    >
                        <p className="text-6xl hover:opacity-75 transition">
                            {initailData.icon}
                        </p>
                    </IconPicker>
                    <Button 
                        onClick={() => {}}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 trasition text-muted-foreground text-xs"
                        variant="outline"
                        size="icon"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </div>
            )}
            {!!initailData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initailData.icon}
                </p>
            )}
            <div className="flex items-center gap-x-1 py-4 opacity-100 group-hover:opacity-100">
                {!initailData.icon && !preview && (
                <IconPicker
                    asChild
                    onChange={() => {}}
                >
                <Button
                    size="sm"
                    variant="outline"
                    className="text-xs text-muted-foreground"
                    >
                    <Smile className="mr-2 h-4 w-4" />
                        Add icon
                    </Button>
                </IconPicker>
            )}
            {!initailData.coverImage && !preview && (
                <Button
                    onClick={() => {}}
                    className="text-muted-foreground text-xs"
                    variant="outline"
                    size="sm"
                >
                    <ImageIcon className="h-4 w-4 m-2" />
                    Add Cover
                </Button>
            )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                />
            ): (
                <div onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold breakwords outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                >
                    {initailData.title}
                </div>
            )}
        </div>
     );
}
 
export default Toolbar;