import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { assetTokens } from '../design/tokens';
import type { SessionStatus } from '../types';
import { TurtleSprite } from './TurtleSprite';

type TurtleSceneProps = {
  progressRatio: number;
  status: SessionStatus;
  selectedMinutes: number;
  secondsLeft: number;
};

type PathPoint = {
  x: number;
  y: number;
  angle: number;
};

const sceneWidth = 1600;
const sceneHeight = 900;
const walkingPath =
  'M190 694C324 676 427 682 554 712C681 742 831 748 968 715C1105 682 1235 661 1436 682';
const careMarkerConfig = [
  { ratio: 0.44, icon: '💧', label: '물 한 모금' },
  { ratio: 0.73, icon: '🥕', label: '당근 응원' },
];

export function TurtleScene({ progressRatio, status, selectedMinutes, secondsLeft }: TurtleSceneProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathPoint, setPathPoint] = useState<PathPoint>({ x: 190, y: 694, angle: 0 });
  const bubbleMessage = getBubbleMessage(status);
  const shouldShowBubble = status !== 'walking' || progressRatio < 0.12;
  const milestoneLabel = getMilestoneLabel(progressRatio, status, selectedMinutes, secondsLeft);

  useLayoutEffect(() => {
    const pathElement = pathRef.current;

    if (pathElement === null) {
      return;
    }

    const length = pathElement.getTotalLength();
    const currentLength = Math.max(0, Math.min(length, progressRatio * length));
    const previousPoint = pathElement.getPointAtLength(Math.max(0, currentLength - 6));
    const currentPoint = pathElement.getPointAtLength(currentLength);
    const nextPoint = pathElement.getPointAtLength(Math.min(length, currentLength + 6));
    const angle = Math.atan2(nextPoint.y - previousPoint.y, nextPoint.x - previousPoint.x) * (180 / Math.PI);

    setPathPoint({
      x: currentPoint.x,
      y: currentPoint.y,
      angle: clamp(angle, -4, 4),
    });
  }, [progressRatio]);

  const turtleStyle = {
    left: `${(pathPoint.x / sceneWidth) * 100}%`,
    top: `${(pathPoint.y / sceneHeight) * 100}%`,
    transform: `translate(-38%, -72%) rotate(${pathPoint.angle}deg)`,
  };

  const careMarkers = useMemo(() => {
    const pathElement = pathRef.current;

    if (pathElement === null) {
      return [];
    }

    const totalLength = pathElement.getTotalLength();

    return careMarkerConfig.map((marker) => {
      const point = pathElement.getPointAtLength(totalLength * marker.ratio);

      return {
        ...marker,
        left: `${(point.x / sceneWidth) * 100}%`,
        top: `${((point.y - 70) / sceneHeight) * 100}%`,
        isPassed: progressRatio >= marker.ratio,
      };
    });
  }, [progressRatio]);

  return (
    <section className={`scene-shell scene-shell-${status}`}>
      <div className="scene scene-with-asset">
        <img src={assetTokens.backgroundScene} alt="" className="scene-background-image" />

        <svg className="scene-path-guide" viewBox={`0 0 ${sceneWidth} ${sceneHeight}`} preserveAspectRatio="none" aria-hidden="true">
          <path ref={pathRef} d={walkingPath} fill="none" stroke="transparent" strokeWidth="20" />
        </svg>

        {shouldShowBubble ? <div className={`speech-bubble speech-bubble-${status}`}>{bubbleMessage}</div> : null}

        <div className="scene-progress-caption">
          <span className="scene-progress-caption-track" />
          <span className="scene-progress-caption-label">{milestoneLabel}</span>
        </div>

        {careMarkers.map((marker) => (
          <div
            key={marker.label}
            className={marker.isPassed ? 'care-scene-marker care-scene-marker-passed' : 'care-scene-marker'}
            style={{ left: marker.left, top: marker.top }}
          >
            <span className="care-scene-marker-icon" aria-hidden="true">
              {marker.icon}
            </span>
            <span>{marker.label}</span>
          </div>
        ))}

        {status === 'completed' ? (
          <div className="scene-finish-glow" aria-hidden="true">
            <span className="finish-glow-ring" />
            <span className="finish-glow-heart">♥</span>
          </div>
        ) : null}

        <div className={`turtle turtle-${status}`} style={turtleStyle}>
          <span className="turtle-shadow" aria-hidden="true" />
          <TurtleSprite status={status} />
        </div>
      </div>
    </section>
  );
}

function getBubbleMessage(status: SessionStatus) {
  switch (status) {
    case 'idle':
      return '시간을 정하면 오늘 산책이 시작돼요.';
    case 'walking':
      return '천천히, 같이 걸어가요.';
    case 'care-needed':
      return '잠깐 돌봐주면 다시 힘이 나요.';
    case 'cheerful':
      return '응원 덕분에 기분이 좋아졌어요.';
    case 'paused':
      return '여기서 조용히 기다릴게요.';
    case 'completed':
      return '오늘 산책도 끝까지 같이 걸었어요.';
    default:
      return '';
  }
}

function getMilestoneLabel(progressRatio: number, status: SessionStatus, selectedMinutes: number, secondsLeft: number) {
  if (status === 'care-needed') {
    return '잠깐만 챙겨주고 다시 흐름으로 돌아가요.';
  }

  if (status === 'cheerful') {
    return '다시 네 속도로 차분히 걷는 중이에요.';
  }

  if (status === 'paused') {
    return '멈춘 자리에서 그대로 기다리고 있어요.';
  }

  if (status === 'completed') {
    return '도착했어요. 오늘의 집중이 길 끝까지 닿았어요.';
  }

  const walkedMinutes = Math.max(0, selectedMinutes - Math.ceil(secondsLeft / 60));

  if (progressRatio < 0.33) {
    return `${walkedMinutes}분째. 막 리듬이 만들어지는 중이에요.`;
  }

  if (progressRatio < 0.7) {
    return `${walkedMinutes}분째. 길 한가운데를 천천히 지나가고 있어요.`;
  }

  return `${walkedMinutes}분째. 거의 다 왔어요.`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
