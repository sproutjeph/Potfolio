import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-strong/15 text-foreground transition-colors hover:border-border-strong/40"
    >
      <Sun
        className="h-4 w-4 transition-transform duration-300"
        style={{
          opacity: mounted && theme === 'light' ? 1 : 0,
          transform: mounted && theme === 'light' ? 'rotate(0deg)' : 'rotate(-90deg)',
          position: 'absolute',
        }}
      />
      <Moon
        className="h-4 w-4 transition-transform duration-300"
        style={{
          opacity: mounted && theme === 'dark' ? 1 : 0,
          transform: mounted && theme === 'dark' ? 'rotate(0deg)' : 'rotate(90deg)',
          position: 'absolute',
        }}
      />
    </button>
  );
}
