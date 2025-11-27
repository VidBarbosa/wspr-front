import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export default function Button({ children, className, variant = "primary", ...rest }: PropsWithChildren<Props>) {
  return (
    <button
      className={clsx(
        "btn",
        variant === "primary" ? "btn-primary" : "border-slate-300 hover:bg-slate-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
