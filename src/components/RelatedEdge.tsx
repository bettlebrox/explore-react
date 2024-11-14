import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';

export default function RelatedEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: EdgeProps) {
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
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ stroke: 'blue' }} />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan"
          style={{
            position: 'absolute',
            left: labelX,
            top: labelY,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <p className="nodrag nopan">{(data?.['~type'] as string | undefined)?.toLowerCase()}</p>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
