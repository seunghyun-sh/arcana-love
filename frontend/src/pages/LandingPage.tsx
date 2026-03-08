import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => (
  <PageShell
    eyebrow="Love Tarot"
    title="감정의 결을 읽는 3-card romantic spread"
    description="질문 하나를 고르고, 세 장의 메이저 아르카나를 펼쳐 지금의 감정과 관계의 흐름을 읽어보세요. 차분하지만 드라마틱한 무드로 완성한 프론트엔드 전용 타로 MVP입니다."
  >
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-aura backdrop-blur">
          <p className="text-xs uppercase tracking-[0.32em] text-gold/75">Spread flow</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              '질문 선택',
              '3장의 카드 드로우',
              '관계 리딩 확인',
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/10 bg-midnight/70 p-4"
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-violet/80">
                  0{index + 1}
                </span>
                <p className="mt-3 font-display text-2xl text-ivory">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-ivory/65">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            Major Arcana 22 cards
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            Rule-based love reading
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            Mobile friendly motion
          </span>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-midnight transition hover:scale-[1.01] hover:bg-[#e2bf56]"
        >
          리딩 시작하기
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex h-[28rem] w-full max-w-[26rem] items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-violet/20 blur-3xl" />
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-3, -1, -3] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-5 top-16 h-[19rem] w-[13rem] rounded-[28px] border border-violet/30 bg-[linear-gradient(180deg,rgba(139,92,246,0.14)_0%,rgba(21,27,47,0.98)_100%)] p-4 shadow-aura"
        >
          <div className="flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <span className="text-[11px] uppercase tracking-[0.36em] text-violet/80">Card I</span>
            <div className="mt-8 flex flex-1 items-center justify-center rounded-[20px] border border-white/10 bg-midnight/60">
              <span className="font-display text-4xl text-ivory">My feelings</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 h-[22rem] w-[15rem] rounded-[32px] border border-gold/60 bg-[linear-gradient(180deg,rgba(212,175,55,0.14)_0%,rgba(21,27,47,0.98)_100%)] p-4 shadow-gold"
        >
          <div className="flex h-full flex-col rounded-[26px] border border-gold/25 bg-white/[0.03] p-5">
            <span className="text-center text-[11px] uppercase tracking-[0.42em] text-gold/80">
              Love Tarot
            </span>
            <div className="mt-8 flex flex-1 items-center justify-center rounded-[22px] border border-gold/20 bg-midnight/60">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.32em] text-ivory/45">3-card spread</p>
                <p className="mt-3 font-display text-5xl text-ivory">Reveal</p>
              </div>
            </div>
            <p className="mt-6 text-center text-sm leading-6 text-ivory/68">
              현대적인 인터랙션과 미스터리한 무드로 만든 로맨틱 타로 경험
            </p>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [4, 2, 4] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-4 h-[19rem] w-[13rem] rounded-[28px] border border-gold/25 bg-[linear-gradient(180deg,rgba(212,175,55,0.08)_0%,rgba(21,27,47,0.98)_100%)] p-4 shadow-gold"
        >
          <div className="flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <span className="text-[11px] uppercase tracking-[0.36em] text-gold/80">Card III</span>
            <div className="mt-8 flex flex-1 items-center justify-center rounded-[20px] border border-white/10 bg-midnight/60">
              <span className="font-display text-4xl text-ivory">Flow</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </PageShell>
);

