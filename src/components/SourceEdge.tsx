import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';

export default function SourceEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  onEdgeClick,
}: EdgeProps & { onEdgeClick: () => void }) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ stroke: 'red' }} />
      <EdgeLabelRenderer>
        <div
          className="button-edge__label nodrag nopan"
          style={{
            position: 'absolute',
            left: labelX,
            top: labelY,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <button className="button-edge__button" onClick={onEdgeClick} style={{ background: 'transparent' }}>
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
