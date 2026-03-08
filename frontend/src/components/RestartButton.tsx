interface RestartButtonProps {
  onClick: () => void;
}

export const RestartButton = ({ onClick }: RestartButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex items-center justify-center rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-medium text-gold transition hover:border-gold/70 hover:bg-gold/15"
  >
    질문 다시 고르고 새로 뽑기
  </button>
);

