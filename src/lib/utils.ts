import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function prettifyBoardName(name: string): string {
    return name.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
}

export enum UserBoardRelationship {
    CREATOR,
    MEMBER,
    NONE
}
