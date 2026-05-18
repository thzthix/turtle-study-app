import type { SessionStatus } from '../../types';

type SceneStatusOverlaysProps = {
  bubbleMessage: string;
  milestoneLabel: string;
  shouldShowBubble: boolean;
  shouldShowMilestone: boolean;
  status: SessionStatus;
};

export function SceneStatusOverlays({
  bubbleMessage,
  milestoneLabel,
  shouldShowBubble,
  shouldShowMilestone,
  status,
}: SceneStatusOverlaysProps) {
  return (
    <>
      {shouldShowBubble ? <div className={`speech-bubble speech-bubble-${status}`}>{bubbleMessage}</div> : null}
      {shouldShowMilestone ? <div className="milestone-caption">{milestoneLabel}</div> : null}

      {status === 'completed' ? (
        <div className="completion-burst" aria-hidden="true">
          <span className="burst-dot burst-dot-a" />
          <span className="burst-dot burst-dot-b" />
          <span className="burst-dot burst-dot-c" />
          <span className="burst-ring" />
        </div>
      ) : null}
    </>
  );
}
