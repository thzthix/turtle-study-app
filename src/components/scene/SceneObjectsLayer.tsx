import { hasApprovedSceneAsset, sceneAssetSlots } from '../../lib/sceneAssetSlots';

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
  const hasAnyApprovedObjectAsset = Object.values(sceneAssetSlots.sceneObjects).some((slot) =>
    hasApprovedSceneAsset(slot.approvedAssetPath),
  );

  return (
    <>
      {hasAnyApprovedObjectAsset ? (
        <>
          <div className="start-sign start-sign-asset">출발</div>
          <div className="finish-sign finish-sign-asset">도착</div>
        </>
      ) : (
        <>
          <div className="start-sign">출발</div>
          <div className="finish-sign">도착</div>
        </>
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
