export default function AvailabilityPill() {
  return (
    <span
      className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border-strong/15 bg-background/50 px-3 py-1.5 backdrop-blur-sm"
      style={{ letterSpacing: 'var(--tracking-eyebrow)' }}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: 'var(--accent)' }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: 'var(--accent)' }}
        />
      </span>
      <span className="text-[10px] font-medium uppercase text-foreground">
        Available
      </span>
    </span>
  );
}
