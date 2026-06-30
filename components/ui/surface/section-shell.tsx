import { cn } from "@/libs/utils";

type SectionShellProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export default function SectionShell({
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionShellProps) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {(eyebrow || title || description) && (
        <div className="mb-5 max-w-2xl">
          {eyebrow && (
            <p className="text-sm font-medium text-accent">{eyebrow}</p>
          )}
          {title && (
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
