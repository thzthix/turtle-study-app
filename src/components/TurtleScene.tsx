import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { SessionStatus } from '../types';

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
        <div className="scene-sky-glow scene-sky-glow-left" />
        <div className="scene-sky-glow scene-sky-glow-right" />
        <div className="scene-cloud cloud-left" />
        <div className="scene-cloud cloud-right" />
        <div className="sun" />
        <div className="hill hill-back" />
        <div className="hill hill-middle" />
        <div className="hill hill-front" />
        <div className="destination-tree" aria-hidden="true">
          <span className="tree-top" />
          <span className="tree-trunk" />
        </div>
        <div className="flower-cluster flower-cluster-left" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="flower-cluster flower-cluster-right" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

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

        <div className="start-sign">출발</div>
        <div className="finish-sign">도착</div>

        {checkpointMarkers.map((marker) => (
          <div
            key={marker.id}
            className={marker.isActive ? 'path-marker path-marker-active' : 'path-marker'}
            style={{ left: marker.left, top: marker.top }}
          >
            {marker.label}
          </div>
        ))}

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

        <div className={`turtle turtle-${status}`} style={turtleStyle}>
          <span className="turtle-shadow" aria-hidden="true" />
          <svg viewBox="0 0 320 200" aria-hidden="true" className="turtle-illustration">
            <g className="tail-group">
              <path d="M32 126c-12 4-22 12-29 23-4 8 1 15 10 15 20-1 34-9 43-25 5-9-5-17-24-13Z" fill="#dbe6a9" />
            </g>
            <g className="back-leg-group">
              <ellipse cx="100" cy="154" rx="18" ry="24" fill="#f7f1d8" />
              <ellipse cx="154" cy="158" rx="17" ry="23" fill="#f3ecd1" />
            </g>
            <g className="front-leg-group">
              <ellipse cx="212" cy="156" rx="18" ry="24" fill="#f7f1d8" />
              <ellipse cx="248" cy="149" rx="17" ry="22" fill="#f4edd4" />
            </g>
            <g className="body-group">
              <path d="M72 124c0-34 36-62 86-62h33c31 0 57 18 72 42 10 16 11 34 4 50-8 18-26 29-50 29H123c-31 0-51-10-51-59Z" fill="#eef1cb" />
              <path d="M106 126c14-8 28-11 43-11 19 0 34 5 50 14 19 10 45 10 75-2l-6 20c-6 19-24 31-44 31H126c-22 0-35-15-20-52Z" fill="#dbefc0" />
            </g>
            <g className="shell-group">
              <path d="M83 112c0-43 40-76 93-76 55 0 98 34 98 82 0 18-9 32-20 40H99c-10-10-16-25-16-46Z" fill="#b7ecae" />
              <path d="M103 118c8-33 36-58 73-61 37-3 71 16 90 47-2 27-18 46-42 54H114c-16-12-22-23-11-40Z" fill="#9ed58c" />
              <path d="M112 85c20-18 45-28 73-28 34 0 65 14 86 39" fill="none" stroke="#7ab067" strokeWidth="8" strokeLinecap="round" />
              <path d="M126 101c18-10 39-16 62-16 28 0 53 8 75 23" fill="none" stroke="#7ab067" strokeWidth="6" strokeLinecap="round" />
              <path d="M106 116c13 13 17 28 15 42" fill="none" stroke="#89bf73" strokeWidth="6" strokeLinecap="round" />
              <path d="M146 92c-5 21-4 43 3 66" fill="none" stroke="#89bf73" strokeWidth="5" strokeLinecap="round" />
              <path d="M189 86c0 25 3 49 9 72" fill="none" stroke="#89bf73" strokeWidth="5" strokeLinecap="round" />
              <path d="M230 95c4 18 8 38 6 60" fill="none" stroke="#89bf73" strokeWidth="5" strokeLinecap="round" />
            </g>
            <g className="head-group">
              <ellipse cx="256" cy="111" rx="34" ry="31" fill="#f8f3da" />
              <ellipse cx="247" cy="121" rx="8" ry="5" fill="#f4cfc0" opacity={status === 'cheerful' || status === 'completed' ? 0.95 : 0.45} />
              <ellipse cx="269" cy="121" rx="8" ry="5" fill="#f4cfc0" opacity={status === 'cheerful' || status === 'completed' ? 0.95 : 0.45} />
              <path d={eyePaths.left} fill="none" stroke="#332317" strokeWidth="5" strokeLinecap="round" />
              <path d={eyePaths.right} fill="none" stroke="#332317" strokeWidth="5" strokeLinecap="round" />
              <path d={mouthPath} fill="none" stroke="#5f4131" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
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
