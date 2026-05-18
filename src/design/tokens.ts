export const colorTokens = {
  cream50: '#fff8ec',
  butter100: '#ffefc6',
  sand200: '#eed7a3',
  leaf200: '#d6e5bf',
  leaf300: '#b8cf92',
  leaf400: '#9eb87f',
  leaf500: '#7e9d63',
  shell300: '#b6c995',
  shell400: '#94b27c',
  shell500: '#759764',
  peach200: '#f6d7c5',
  wood400: '#b99463',
  wood500: '#8f6c47',
} as const;

export const surfaceTokens = {
  panelBackground: 'rgba(255, 252, 244, 0.82)',
  panelBorder: 'rgba(255, 255, 255, 0.5)',
  panelShadow: '0 16px 36px rgba(120, 117, 89, 0.12)',
  radiusSm: '24px',
  radiusMd: '28px',
  radiusLg: '32px',
} as const;

export const assetTokens = {
  backgroundScene: '/design-system/background-scene.svg',
  turtleWalking: '/design-system/turtle-walking.svg',
  turtleResting: '/design-system/turtle-resting.svg',
  turtleCheerful: '/design-system/turtle-cheerful.svg',
} as const;

export const motionTokens = {
  walkBobDuration: '1200ms',
  walkStepDuration: '760ms',
  restBreathDuration: '2800ms',
  cheerfulBounceDuration: '900ms',
} as const;
