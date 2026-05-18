import type { SessionStatus } from '../../types';

type TurtleCharacterProps = {
  mouthPath: string;
  eyePaths: {
    left: string;
    right: string;
  };
  status: SessionStatus;
  turtleStyle: {
    left: string;
    top: string;
    transform: string;
  };
};

export function TurtleCharacter({ mouthPath, eyePaths, status, turtleStyle }: TurtleCharacterProps) {
  return (
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
  );
}
