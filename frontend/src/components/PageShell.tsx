import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  align?: 'center' | 'left';
}

export const PageShell = ({
  eyebrow,
  title,
  description,
  children,
  align = 'left',
}: PageShellProps) => (
  <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <span className="inline-flex items-center rounded-full border border-gold/30 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.32em] text-gold/90">
        {eyebrow}
      </span>
      <h1 className="mt-5 font-display text-5xl leading-none text-ivory sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      <p className="mt-5 text-sm leading-7 text-ivory/70 sm:text-base">{description}</p>
    </motion.header>

    <div className="mt-8 flex-1">{children}</div>
  </div>
);

