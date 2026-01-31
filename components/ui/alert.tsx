import * as React from "react";

import { cn } from "@/lib/utils";

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
};

export function Alert({ className, title, description, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-2xl border border-ink/15 bg-white/80 px-4 py-3 text-sm text-ink/80 shadow-sm",
        className
      )}
      {...props}
    >
      {title && <p className="font-semibold text-ink">{title}</p>}
      {description && <p className="mt-1 text-ink/70">{description}</p>}
    </div>
  );
}
