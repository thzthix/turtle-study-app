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

  const title =
    activeCareOption === 'water' ? '거북이가 물 한 모금 기다려요' : '거북이가 다정한 당근 응원을 기다려요';
  const description =
    activeCareOption === 'water'
      ? '길게 보지 않아도 괜찮아요. 물 한 모금만 건네고 다시 집중 흐름으로 돌아가면 됩니다.'
      : '힘든 구간을 넘길 수 있게 짧고 부드럽게 응원해주세요.';
  const buttonLabel = activeCareOption === 'water' ? '물 주기' : '당근 주기';

  return (
    <section className="care-card card">
      <p className="eyebrow">Care Check</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <button type="button" className="primary-button" onClick={() => onSoothe(activeCareOption)}>
        {buttonLabel}
      </button>
    </section>
  );
}
