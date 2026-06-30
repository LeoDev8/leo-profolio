import { cn } from "@/libs/utils";

type GlassPanelProps<T extends React.ElementType = "div"> = {
  as?: T;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function GlassPanel<T extends React.ElementType = "div">({
  as,
  hover = false,
  className,
  children,
  ...props
}: GlassPanelProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={cn("glass-panel", hover && "glass-panel-hover", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
