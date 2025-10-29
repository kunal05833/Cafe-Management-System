import React from "react";
import { cn } from "../../utils/cn";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
};

const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-lg p-4 space-y-3">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
};

export { Skeleton, SkeletonCard };