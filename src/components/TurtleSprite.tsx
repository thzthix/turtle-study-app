import { assetTokens } from '../design/tokens';
import type { SessionStatus } from '../types';

type TurtleSpriteProps = {
  status: SessionStatus;
};

export function TurtleSprite({ status }: TurtleSpriteProps) {
  if (status === 'walking') {
    return (
      <div className="turtle-sprite turtle-sprite-walking" aria-hidden="true">
        <img src={assetTokens.turtleWalking} alt="" className="turtle-frame turtle-frame-a" />
        <img src={assetTokens.turtleWalkingStep} alt="" className="turtle-frame turtle-frame-b" />
      </div>
    );
  }

  const spriteSource = getSpriteSource(status);

  return (
    <div className={`turtle-sprite turtle-sprite-${status}`} aria-hidden="true">
      <img src={spriteSource} alt="" className="turtle-frame turtle-frame-single" />
    </div>
  );
}

function getSpriteSource(status: SessionStatus) {
  switch (status) {
    case 'care-needed':
    case 'paused':
      return assetTokens.turtleResting;
    case 'cheerful':
    case 'completed':
      return assetTokens.turtleCheerful;
    case 'walking':
    case 'idle':
    default:
      return assetTokens.turtleWalking;
  }
}
