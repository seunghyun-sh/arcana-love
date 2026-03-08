import { motion } from 'framer-motion';
import type { TarotCard as TarotCardType } from '../types/tarot';

interface TarotCardProps {
  card?: TarotCardType;
  positionLabel: string;
  positionTitle?: string;
  isFlipped: boolean;
  delay?: number;
  size?: 'regular' | 'compact';
}

export const TarotCard = ({
  card,
  positionLabel,
  positionTitle,
  isFlipped,
  delay = 0,
  size = 'regular',
}: TarotCardProps) => {
  const isCompact = size === 'compact';

  return (
    <div
      className={`tarot-perspective w-full ${
        isCompact ? 'max-w-[16rem]' : 'max-w-[18rem]'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay }}
        whileHover={{ y: -8 }}
        className={isCompact ? 'h-[19rem] sm:h-[20rem]' : 'h-[22rem] sm:h-[24rem]'}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          className="tarot-flip-inner relative h-full w-full"
        >
          <div className="tarot-face absolute inset-0 rounded-[28px] border border-gold/50 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.15),_transparent_40%),linear-gradient(180deg,rgba(21,27,47,0.98)_0%,rgba(8,12,26,0.98)_100%)] p-4 shadow-gold">
            <div className="flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-gold/70">
                  {positionLabel}
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-ivory/40">
                  Face Down
                </span>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-gold/35 bg-gold/5">
                  <span className="font-display text-4xl text-ivory">LT</span>
                </div>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-midnight/70 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.36em] text-violet/70">Love spread</p>
                <p className="mt-2 text-sm text-ivory/70">
                  {positionTitle ?? 'Reveal after drawing all cards'}
                </p>
              </div>
            </div>
          </div>

          <div className="tarot-face tarot-face-front absolute inset-0 rounded-[28px] border border-gold/60 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_32%),linear-gradient(180deg,rgba(21,27,47,0.98)_0%,rgba(9,14,31,0.98)_100%)] p-4 shadow-gold">
            <div className="flex h-full flex-col rounded-[22px] border border-gold/20 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.32em] text-gold/75">
                    {positionLabel}
                  </p>
                  <p className="mt-1 text-sm text-ivory/60">{positionTitle}</p>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-ivory/45">
                  Upright
                </div>
              </div>

              <div className="mt-6 flex-1">
                <div className="rounded-[20px] border border-white/10 bg-midnight/50 p-5">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-violet/70">
                    Major Arcana
                  </p>
                  <h3 className="mt-4 font-display text-4xl leading-none text-ivory">
                    {card?.koreanName ?? 'Unknown'}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.28em] text-gold/65">
                    {card?.englishName ?? ''}
                  </p>
                </div>

                <div className="mt-4 rounded-[20px] border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-ivory/45">
                    Core meaning
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ivory/75">
                    {card?.uprightMeaning ?? 'This card will reveal a relationship insight.'}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {card?.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-violet/20 bg-violet/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-violet/85"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

