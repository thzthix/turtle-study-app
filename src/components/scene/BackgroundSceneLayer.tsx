import { hasApprovedSceneAsset, sceneAssetSlots } from '../../lib/sceneAssetSlots';

export function BackgroundSceneLayer() {
  if (hasApprovedSceneAsset(sceneAssetSlots.backgroundScene.approvedAssetPath)) {
    return (
      <div className="scene-raster-layer scene-raster-layer-background" aria-hidden="true">
        <img src={sceneAssetSlots.backgroundScene.approvedAssetPath} alt="" />
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}
