import type { PropsWithChildren, HTMLAttributes } from "react";
import clsx from "clsx";

export default function Card({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200 p-4 shadow-sm bg-white/80 backdrop-blur",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
