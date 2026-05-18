import type { CareOption, SessionStatus } from '../types';

type CarePromptProps = {
  activeCareOption: CareOption | null;
  status: SessionStatus;
  onSoothe: (option: CareOption) => void;
};

export function CarePrompt({ activeCareOption, status, onSoothe }: CarePromptProps) {
  if (activeCareOption === null || status !== 'care-needed') {
    return null;
  }

  const title = activeCareOption === 'water' ? '잠깐 물 한 모금' : '잠깐 당근 응원';
  const buttonLabel = activeCareOption === 'water' ? '물 주기' : '당근 주기';
  const iconLabel = activeCareOption === 'water' ? '물' : '당근';

  return (
    <section className="care-card">
      <p className="eyebrow">care moments</p>
      <div className="care-card-row">
        <div className="care-card-copy">
          <h2>{title}</h2>
          <p>길게 보지 않아도 괜찮아요.</p>
        </div>
        <button type="button" className="care-option-button" onClick={() => onSoothe(activeCareOption)}>
          <span className="care-option-icon" aria-hidden="true">
            {iconLabel}
          </span>
          <span className="care-option-text">{buttonLabel}</span>
        </button>
      </div>
    </section>
  );
}
