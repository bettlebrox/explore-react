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
        background: data['~labels']?.[0]
          ? `hsl(${Math.abs(data['~labels'][0].split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 360}, 70%, 95%)`
          : 'white',
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
        title={JSON.stringify(data, null, 2)}
      >
        {data['~properties']?.name || data['~labels']?.[0] || 'Unnamed Entity'}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
