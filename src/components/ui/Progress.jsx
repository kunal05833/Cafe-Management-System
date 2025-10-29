import React from "react";
import { cn } from "../../utils/cn";

export const Progress = ({ value = 0, className }) => {
  const v = Math.max(0, Math.min(100, Number(value)));
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div className="h-full bg-primary transition-[width] duration-300 ease-out" style={{ width: `${v}%` }} />
    </div>
  );
};
export default Progress;