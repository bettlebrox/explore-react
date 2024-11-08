import { Handle, Position } from '@xyflow/react';

interface EntityNodeData {
  '~properties'?: {
    name?: string;
  };
  '~labels'?: string[];
}

export default function EntityNode({ data }: { data: EntityNodeData }) {
  return (
    <div
      style={{
        padding: '10px',
        borderRadius: '5px',
        background: 'white',
        border: '1px solid #ddd',
        minWidth: '150px',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {data['~properties']?.name || data['~labels']?.[0] || 'Unnamed Entity'}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
