import React from "react";

interface BoardsContainerProps {
    children: React.ReactNode
}

export function BoardsContainer({ children }: BoardsContainerProps) {
    return (
        <ul>
            {children}
        </ul>
    );
}
