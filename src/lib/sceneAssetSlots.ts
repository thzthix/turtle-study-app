export type SceneObjectAssetKey =
  | 'startSign'
  | 'waterBowl'
  | 'carrot'
  | 'arrowSign'
  | 'finishFlag';

export type TurtleStateAssetKey = 'walking' | 'resting' | 'cheerful';

export type SceneAssetSlot = {
  approvedAssetPath: string | null;
  note: string;
};

export const sceneAssetSlots = {
  backgroundScene: {
    approvedAssetPath: null,
    note: '승인된 background-scene 자산이 준비되면 전체 장면 베이스 레이어를 교체한다.',
  },
  sceneObjects: {
    startSign: {
      approvedAssetPath: null,
      note: '시안 기준의 시작 표지판 자산',
    },
    waterBowl: {
      approvedAssetPath: null,
      note: '시안 기준의 물그릇 자산',
    },
    carrot: {
      approvedAssetPath: null,
      note: '시안 기준의 당근 자산',
    },
    arrowSign: {
      approvedAssetPath: null,
      note: '시안 기준의 방향 표지판 자산',
    },
    finishFlag: {
      approvedAssetPath: null,
      note: '시안 기준의 도착 깃발 자산',
    },
  },
  turtleStates: {
    walking: {
      approvedAssetPath: null,
      note: '1.19.02의 walking 기준 자산',
    },
    resting: {
      approvedAssetPath: null,
      note: '1.19.02의 resting 기준 자산',
    },
    cheerful: {
      approvedAssetPath: null,
      note: '1.19.02의 cheerful 기준 자산',
    },
  },
} satisfies {
  backgroundScene: SceneAssetSlot;
  sceneObjects: Record<SceneObjectAssetKey, SceneAssetSlot>;
  turtleStates: Record<TurtleStateAssetKey, SceneAssetSlot>;
};

export function hasApprovedSceneAsset(assetPath: string | null): assetPath is string {
  return assetPath !== null && assetPath.trim().length > 0;
}
