export type Icons = "move" | "chevron-up" | "chevron-down";

export type IconSize = "sm" | "md" | "lg" | "xl" | "xxl";

export type IconProps = {
  className?: string;
  icon: Icons;
  size?: IconSize;
};
