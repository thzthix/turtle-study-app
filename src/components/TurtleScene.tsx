import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { SessionStatus } from '../types';
import { BackgroundSceneLayer } from './scene/BackgroundSceneLayer';
import { SceneObjectsLayer } from './scene/SceneObjectsLayer';
import { SceneStatusOverlays } from './scene/SceneStatusOverlays';
import { TurtleCharacter } from './scene/TurtleCharacter';

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

const sceneWidth = 1200;
const sceneHeight = 520;
const walkingPath = 'M82 350C198 314 314 318 430 346C534 372 648 372 760 338C872 304 986 300 1110 336';
const checkpointRatios = [0.4, 0.78];

export function TurtleScene({ progressRatio, status, selectedMinutes, secondsLeft }: TurtleSceneProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathPoint, setPathPoint] = useState<PathPoint>({ x: 82, y: 350, angle: -2 });
  const bubbleMessage = getBubbleMessage(status);
  const milestoneLabel = getMilestoneLabel(progressRatio, status, selectedMinutes, secondsLeft);
  const eyePaths = getEyePaths(status);
  const mouthPath = getMouthPath(status);
  const shouldShowBubble = status !== 'walking' || progressRatio < 0.08;
  const shouldShowMilestone = status === 'walking' || status === 'cheerful' || status === 'care-needed';

  useLayoutEffect(() => {
    const pathElement = pathRef.current;

    if (pathElement === null) {
      return;
    }

    const length = pathElement.getTotalLength();
    const currentLength = Math.max(0, Math.min(length, progressRatio * length));
    const previousPoint = pathElement.getPointAtLength(Math.max(0, currentLength - 4));
    const currentPoint = pathElement.getPointAtLength(currentLength);
    const nextPoint = pathElement.getPointAtLength(Math.min(length, currentLength + 4));
    const angle = Math.atan2(nextPoint.y - previousPoint.y, nextPoint.x - previousPoint.x) * (180 / Math.PI);

    setPathPoint({
      x: currentPoint.x,
      y: currentPoint.y,
      angle: clamp(angle, -12, 12),
    });
  }, [progressRatio]);

  const turtleStyle = {
    left: `${(pathPoint.x / sceneWidth) * 100}%`,
    top: `${(pathPoint.y / sceneHeight) * 100}%`,
    transform: `translate(-40%, -79%) rotate(${pathPoint.angle}deg)`,
  };

  const checkpointMarkers = useMemo(() => {
    const pathElement = pathRef.current;

    if (pathElement === null) {
      return [];
    }

    const totalLength = pathElement.getTotalLength();

    return checkpointRatios.map((ratio, index) => {
      const point = pathElement.getPointAtLength(totalLength * ratio);

      return {
        id: ratio,
        left: `${(point.x / sceneWidth) * 100}%`,
        top: `${((point.y - 40) / sceneHeight) * 100}%`,
        label: index === 0 ? '물 한 모금' : '당근 응원',
        isActive: progressRatio >= ratio,
      };
    });
  }, [progressRatio]);

  return (
    <section className={`scene-shell scene-shell-${status}`}>
      <div className="scene">
        <BackgroundSceneLayer />

        <svg className="path-svg" viewBox={`0 0 ${sceneWidth} ${sceneHeight}`} preserveAspectRatio="none" aria-hidden="true">
          <path
            ref={pathRef}
            className="path-line path-line-shadow"
            d={walkingPath}
            pathLength="100"
          />
          <path
            className="path-line"
            d={walkingPath}
            pathLength="100"
          />
          <path
            className="path-line-progress"
            d={walkingPath}
            pathLength="100"
            style={{ strokeDasharray: `${Math.max(3, progressRatio * 100)} 100` }}
          />
        </svg>

        <SceneObjectsLayer checkpointMarkers={checkpointMarkers} />
        <SceneStatusOverlays
          bubbleMessage={bubbleMessage}
          milestoneLabel={milestoneLabel}
          shouldShowBubble={shouldShowBubble}
          shouldShowMilestone={shouldShowMilestone}
          status={status}
        />
        <TurtleCharacter eyePaths={eyePaths} mouthPath={mouthPath} status={status} turtleStyle={turtleStyle} />
      </div>
    </section>
  );
}

function getBubbleMessage(status: SessionStatus) {
  switch (status) {
    case 'idle':
      return '시간을 정하면 오늘 산책이 시작돼요.';
    case 'walking':
      return '같이 호흡 맞춰 걸어볼까요?';
    case 'care-needed':
      return '잠깐 다정함이 필요해요.';
    case 'cheerful':
      return '덕분에 다시 힘이 났어요.';
    case 'paused':
      return '여기서 조용히 기다리고 있을게요.';
    case 'completed':
      return '끝까지 같이 걸었어요. 정말 잘했어요.';
    default:
      return '';
  }
}

function getMilestoneLabel(progressRatio: number, status: SessionStatus, selectedMinutes: number, secondsLeft: number) {
  if (status === 'care-needed') {
    return '잠깐 챙겨주고 다시 흐름으로 돌아가요.';
  }

  if (status === 'cheerful') {
    return '다시 리듬을 찾았어요.';
  }

  const walkedMinutes = Math.max(0, selectedMinutes - Math.ceil(secondsLeft / 60));

  if (progressRatio < 0.34) {
    return `${walkedMinutes}분째, 이제 막 리듬이 만들어지고 있어요.`;
  }

  if (progressRatio < 0.7) {
    return `${walkedMinutes}분째, 길 한가운데를 차분히 지나가는 중이에요.`;
  }

  return `${walkedMinutes}분째, 거의 다 왔어요. 거북이도 끝을 보고 있어요.`;
}

function getEyePaths(status: SessionStatus) {
  switch (status) {
    case 'care-needed':
      return {
        left: 'M245 107q6 4 12 0',
        right: 'M261 107q6 4 12 0',
      };
    case 'cheerful':
    case 'completed':
      return {
        left: 'M244 103q7 8 14 0',
        right: 'M260 103q7 8 14 0',
      };
    case 'paused':
      return {
        left: 'M244 109q7 -3 14 0',
        right: 'M260 109q7 -3 14 0',
      };
    default:
      return {
        left: 'M251 104v1',
        right: 'M267 104v1',
      };
  }
}

function getMouthPath(status: SessionStatus) {
  switch (status) {
    case 'care-needed':
      return 'M250 122q6 3 12 0';
    case 'cheerful':
    case 'completed':
      return 'M248 120q10 8 20 0';
    case 'paused':
      return 'M250 123q7 -2 14 0';
    default:
      return 'M251 121q5 4 10 0';
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
