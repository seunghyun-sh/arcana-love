import { motion } from 'framer-motion';

interface CardDeckProps {
  remainingCards: number;
  drawnCount: number;
  canDraw: boolean;
  onDraw: () => void;
}

export const CardDeck = ({
  remainingCards,
  drawnCount,
  canDraw,
  onDraw,
}: CardDeckProps) => (
  <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-aura backdrop-blur">
    <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-ivory/50">
      <span>Arcana deck</span>
      <span>{remainingCards} cards left</span>
    </div>

    <motion.button
      type="button"
      onClick={onDraw}
      disabled={!canDraw}
      whileHover={canDraw ? { y: -6 } : undefined}
      whileTap={canDraw ? { scale: 0.985 } : undefined}
      className={`mt-6 flex w-full flex-col items-center ${canDraw ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
    >
      <div className="relative h-[20rem] w-[14rem] sm:h-[22rem] sm:w-[15rem]">
        <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[28px] border border-violet/20 bg-violet/10" />
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border border-gold/25 bg-gold/5" />
        <div className="absolute inset-0 rounded-[28px] border border-gold/60 bg-panel p-5 shadow-gold">
          <div className="flex h-full flex-col rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),_transparent_45%),linear-gradient(180deg,rgba(21,27,47,0.98)_0%,rgba(12,17,33,0.98)_100%)] p-5">
            <span className="text-center text-[11px] uppercase tracking-[0.48em] text-gold/70">
              Love Tarot
            </span>
            <div className="mt-10 flex flex-1 items-center justify-center rounded-[20px] border border-gold/20 bg-white/[0.02]">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border border-gold/40 text-center">
                <span className="font-display text-5xl text-ivory">LT</span>
              </div>
            </div>
            <div className="mt-8 space-y-2 text-center">
              <p className="text-sm uppercase tracking-[0.36em] text-ivory/55">Draw a card</p>
              <p className="text-xs leading-6 text-ivory/65">
                한 장씩 뽑아 세 장의 스프레드를 완성하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.button>

    <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-midnight/60 px-4 py-3 text-sm text-ivory/70">
      <span>Drawn</span>
      <span className="font-display text-2xl text-ivory">{drawnCount}/3</span>
    </div>
  </div>
);

