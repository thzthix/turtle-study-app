import { hasApprovedSceneAsset, sceneAssetSlots, type SceneObjectAssetKey } from '../../lib/sceneAssetSlots';

type SceneObjectMarker = {
  id: number;
  left: string;
  top: string;
  label: string;
  isActive: boolean;
};

type SceneObjectsLayerProps = {
  checkpointMarkers: SceneObjectMarker[];
};

export function SceneObjectsLayer({ checkpointMarkers }: SceneObjectsLayerProps) {
  const startSignPath = sceneAssetSlots.sceneObjects.startSign.approvedAssetPath;
  const finishFlagPath = sceneAssetSlots.sceneObjects.finishFlag.approvedAssetPath;
  const arrowSignPath = sceneAssetSlots.sceneObjects.arrowSign.approvedAssetPath;
  const waterBowlPath = sceneAssetSlots.sceneObjects.waterBowl.approvedAssetPath;
  const carrotPath = sceneAssetSlots.sceneObjects.carrot.approvedAssetPath;

  return (
    <>
      {hasApprovedSceneAsset(startSignPath) ? (
        <SceneObjectAsset assetKey="startSign" assetPath={startSignPath} label="출발" />
      ) : (
        <div className="start-sign">출발</div>
      )}

      {hasApprovedSceneAsset(arrowSignPath) ? <SceneObjectAsset assetKey="arrowSign" assetPath={arrowSignPath} label="방향" /> : null}
      {hasApprovedSceneAsset(waterBowlPath) ? <SceneObjectAsset assetKey="waterBowl" assetPath={waterBowlPath} label="물그릇" /> : null}
      {hasApprovedSceneAsset(carrotPath) ? <SceneObjectAsset assetKey="carrot" assetPath={carrotPath} label="당근" /> : null}

      {hasApprovedSceneAsset(finishFlagPath) ? (
        <SceneObjectAsset assetKey="finishFlag" assetPath={finishFlagPath} label="도착" />
      ) : (
        <div className="finish-sign">도착</div>
      )}

      {checkpointMarkers.map((marker) => (
        <div
          key={marker.id}
          className={marker.isActive ? 'path-marker path-marker-active' : 'path-marker'}
          style={{ left: marker.left, top: marker.top }}
        >
          {marker.label}
        </div>
      ))}
    </>
  );
}

type SceneObjectAssetProps = {
  assetKey: SceneObjectAssetKey;
  assetPath: string;
  label: string;
};

function SceneObjectAsset({ assetKey, assetPath, label }: SceneObjectAssetProps) {
  return (
    <div className={`scene-object-asset scene-object-asset-${assetKey}`} aria-label={label}>
      <img src={assetPath} alt="" aria-hidden="true" />
    </div>
  );
}
