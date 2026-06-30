import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import GlassPanel from "./glass-panel";

type AnimatedLinkCardProps = {
  href: string;
  title: string;
  description: string;
  label: string;
  icon: LucideIcon;
};

export default function AnimatedLinkCard({
  href,
  title,
  description,
  label,
  icon: Icon,
}: AnimatedLinkCardProps) {
  return (
    <GlassPanel
      as={Link}
      href={href}
      hover
      className="group flex min-h-56 flex-col justify-between p-5"
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-glass-border bg-glass-highlight text-accent shadow-glass-inner">
            <Icon size={20} strokeWidth={1.8} />
          </span>
          <ArrowUpRight
            className="text-muted transition-transform duration-motion group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            size={18}
            strokeWidth={1.8}
          />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      </div>
      <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-accent">
        {label}
      </p>
    </GlassPanel>
  );
}
