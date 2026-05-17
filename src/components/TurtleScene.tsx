import type { SessionStatus } from '../types';

type TurtleSceneProps = {
  progressRatio: number;
  status: SessionStatus;
  mode: 'preview' | 'focus';
};

export function TurtleScene({ progressRatio, status, mode }: TurtleSceneProps) {
  const verticalOffset = getVerticalOffset(progressRatio);
  const turtleStyle = {
    transform: `translate(${progressRatio * 100}%, ${verticalOffset}px)`,
  };

  const bubbleMessage = getBubbleMessage(status);
  const eyePath = getEyePath(status);
  const mouthPath = getMouthPath(status);
  const cheekOpacity = status === 'cheerful' || status === 'completed' ? 1 : 0.45;
  const moodIcon = getMoodIcon(status);
  const shouldShowHeader = mode === 'preview';
  const shouldShowBubble =
    mode === 'preview' || status === 'care-needed' || status === 'paused' || status === 'completed';
  const shouldShowMoodToken = mode === 'preview';

  return (
    <section className={mode === 'focus' ? 'scene-card scene-card-focus' : 'scene-card'}>
      {shouldShowHeader ? (
        <div className="scene-header">
          <p className="eyebrow">Turtle Companion</p>
          <h2>오늘의 산책길</h2>
        </div>
      ) : null}

      <div className={mode === 'focus' ? 'scene scene-focus' : 'scene'}>
        <div className="scene-glow" />
        <div className="sun" />
        <div className="sparkle sparkle-left" />
        <div className="sparkle sparkle-right" />
        <div className="hill hill-back" />
        <div className="hill hill-front" />
        <svg className="path-svg" viewBox="0 0 640 260" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="path-line"
            d="M24 186C94 138 154 234 238 198C320 164 382 110 462 136C528 158 568 208 616 178"
          />
          <path
            className="path-line-progress"
            d="M24 186C94 138 154 234 238 198C320 164 382 110 462 136C528 158 568 208 616 178"
            pathLength="100"
            style={{ strokeDasharray: `${Math.max(8, progressRatio * 100)} 100` }}
          />
        </svg>

        {shouldShowBubble ? <div className={`speech-bubble speech-bubble-${status}`}>{bubbleMessage}</div> : null}
        {shouldShowMoodToken ? (
          <div className={`mood-token mood-token-${status}`}>
            <span className="mood-token-icon" aria-hidden="true">
              {moodIcon}
            </span>
            <span>{getMoodLabel(status)}</span>
          </div>
        ) : null}
        {status === 'completed' ? (
          <div className="completion-burst" aria-hidden="true">
            <span className="burst-dot burst-dot-a" />
            <span className="burst-dot burst-dot-b" />
            <span className="burst-dot burst-dot-c" />
            <span className="burst-ring" />
          </div>
        ) : null}

        <div className={`turtle turtle-${status}`} style={turtleStyle}>
          <svg viewBox="0 0 360 230" aria-hidden="true" className="turtle-illustration">
            <g className="tail-group">
              <path
                d="M18 164c17-2 31 0 43 7 8 4 10 14 4 20-16 16-36 22-62 17-13-2-17-18-6-27 6-5 13-12 21-17Z"
                fill="#d7dda1"
              />
            </g>
            <g className="back-leg-group">
              <path
                d="M124 174c-14 23-31 37-52 43-17 5-31-11-24-27 10-21 29-37 57-48 18-7 30 16 19 32Z"
                fill="#d7dda1"
              />
            </g>
            <g className="front-leg-group">
              <path
                d="M216 176c-14 27-34 44-60 51-16 4-28-13-19-28 14-24 35-41 66-50 17-5 23 13 13 27Z"
                fill="#d7dda1"
              />
              <path
                d="M248 142c18 12 30 36 32 68 1 12-11 19-21 12-29-18-41-49-39-76 1-12 17-14 28-4Z"
                fill="#c7cd90"
              />
            </g>
            <g className="shell-group">
              <ellipse cx="145" cy="122" rx="110" ry="76" fill="#7fa16c" />
              <ellipse cx="145" cy="143" rx="118" ry="30" fill="#89a96f" />
              <path
                d="M73 98l38-29 57-12 48 16 18 38-18 40-55 18-58-19-24-33 6-19-21-10 9-16Z"
                fill="#6f8f65"
              />
              <path d="M121 76 154 67 186 77 170 109 133 115 108 95Z" fill="#7d9c73" />
              <path d="M186 77 216 88 207 127 170 109Z" fill="#75956d" />
              <path d="M133 115 170 109 165 148 122 148 100 126Z" fill="#6d8c63" />
              <path d="M170 109 207 127 195 157 165 148Z" fill="#67885f" />
            </g>
            <g className="head-group">
              <ellipse cx="246" cy="96" rx="38" ry="46" fill="#d7dda1" />
              <ellipse cx="241" cy="105" rx="8" ry="5" fill="#f6d0ba" opacity={cheekOpacity} />
              <ellipse cx="265" cy="105" rx="8" ry="5" fill="#f6d0ba" opacity={cheekOpacity} />
              <path d={eyePath.left} fill="none" stroke="#3f2317" strokeWidth="5.5" strokeLinecap="round" />
              <path d={eyePath.right} fill="none" stroke="#3f2317" strokeWidth="5.5" strokeLinecap="round" />
              <path d={mouthPath} fill="none" stroke="#4d3225" strokeWidth="4.5" strokeLinecap="round" />
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
      return '출발할 준비 끝';
    case 'walking':
      return '같이 천천히 가요';
    case 'care-needed':
      return '잠깐 다정함이 필요해요';
    case 'cheerful':
      return '기분이 다시 말랑해졌어요';
    case 'paused':
      return '잠깐 기다리고 있을게요';
    case 'completed':
      return '오늘 산책 완주! 아주 잘했어요';
    default:
      return '';
  }
}

function getVerticalOffset(progressRatio: number) {
  const firstWave = Math.sin(progressRatio * Math.PI * 1.8) * 18;
  const secondWave = Math.sin(progressRatio * Math.PI * 3.2) * 8;

  return Math.round(firstWave + secondWave);
}

function getMoodLabel(status: SessionStatus) {
  switch (status) {
    case 'idle':
      return '산책 준비 중';
    case 'walking':
      return '차분히 걷는 중';
    case 'care-needed':
      return '잠깐 응원이 필요해요';
    case 'cheerful':
      return '다시 기분 좋아짐';
    case 'paused':
      return '잠깐 쉬는 중';
    case 'completed':
      return '완주하고 신난 상태';
    default:
      return '';
  }
}

function getMoodIcon(status: SessionStatus) {
  switch (status) {
    case 'idle':
      return 'o';
    case 'walking':
      return '∞';
    case 'care-needed':
      return '!';
    case 'cheerful':
      return '♥';
    case 'paused':
      return 'Z';
    case 'completed':
      return '★';
    default:
      return '';
  }
}

function getEyePath(status: SessionStatus) {
  switch (status) {
    case 'care-needed':
      return {
        left: 'M241 90q5 4 10 0',
        right: 'M257 90q5 4 10 0',
      };
    case 'cheerful':
    case 'completed':
      return {
        left: 'M239 88q6 7 12 0',
        right: 'M255 88q6 7 12 0',
      };
    case 'paused':
      return {
        left: 'M239 91q6 -4 12 0',
        right: 'M255 91q6 -4 12 0',
      };
    default:
      return {
        left: 'M246 89v1',
        right: 'M262 89v1',
      };
  }
}

function getMouthPath(status: SessionStatus) {
  switch (status) {
    case 'care-needed':
      return 'M244 104q6 4 12 0';
    case 'cheerful':
    case 'completed':
      return 'M242 103q8 7 16 0';
    case 'paused':
      return 'M245 106q5 -2 10 0';
    default:
      return 'M246 104q4 3 8 0';
  }
}
