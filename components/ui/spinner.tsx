import * as React from "react";

import { cn } from "@/lib/utils";

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "h-5 w-5 animate-spin rounded-full border-2 border-ink/30 border-t-ink",
        className
      )}
      {...props}
    />
  );
}
