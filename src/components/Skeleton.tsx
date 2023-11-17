import clsx from "clsx";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={clsx(
                "animate-pulse rounded-md bg-muted",
                className)
            }
            {...props}
        />
    );
}
