import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { isValidElement, cloneElement } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  asChild?: boolean;
  children: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const mergedClassName = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition",
    variant === "primary"
      ? "bg-accent text-black hover:bg-[#f1b972]"
      : "border border-white/20 text-white hover:border-white/50",
    className
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement, {
      className: cn(
        mergedClassName,
        (children as ReactElement<{ className?: string }>).props.className
      )
    });
  }

  return (
    <button className={mergedClassName} {...props}>
      {children}
    </button>
  );
}
