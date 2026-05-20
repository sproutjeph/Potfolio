import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type Link = { href: string; label: string };

interface Props {
  links: Link[];
  pathname: string;
}

export default function MobileNav({ links, pathname }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong/15 text-foreground transition-colors hover:border-border-strong/40"
        >
          <Menu className="h-4 w-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96 border-l border-border bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl tracking-[-0.04em]">
            Menu
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-6 pb-10 pt-4" aria-label="Mobile">
          {links.map((link) => {
            const active =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                className="group relative flex items-baseline justify-between border-b border-border py-5"
                style={{ letterSpacing: '-0.02em' }}
              >
                <span
                  className="font-display text-3xl font-black leading-none"
                  style={{
                    color: active ? 'var(--accent)' : 'var(--foreground)',
                  }}
                >
                  {link.label}
                </span>
                <span
                  className="eyebrow text-muted-foreground"
                  style={{ opacity: active ? 1 : 0.5 }}
                >
                  0{links.indexOf(link) + 1}
                </span>
              </a>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
