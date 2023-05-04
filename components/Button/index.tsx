import cn from "classnames";

import s from "./button.module.scss";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "text" | "contained" | "outlined";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  fullWidth?: boolean;
  noDetail?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "contained",
  size = "md",
  fullWidth = false,
  noDetail = false,
  className,

  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cn(
        s.btn,
        s[size],
        s[variant],
        {
          [s.fullWidth]: fullWidth,
          ["bg-glass"]: variant === "contained",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
