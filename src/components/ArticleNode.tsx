import { Handle, Position } from '@xyflow/react';

interface EntityNodeData {
  '~properties'?: {
    name?: string;
    title?: string;
    url?: string;
  };
  '~labels'?: string[];
}

export default function ArticleNode({ data }: { data: EntityNodeData }) {
  return (
    <div
      style={{
        padding: '10px',
        borderRadius: '5px',
        background: 'red',
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
        title={JSON.stringify(
          data,
          ['title', '~labels', '~properties', 'domain', 'created_at', 'updated_at', 'url'],
          2,
        )}
      >
        <a href={data['~properties']?.url}>
          {decodeURIComponent(
            (
              data['~properties']?.title ||
              data['~properties']?.name ||
              data['~labels']?.[0] ||
              'Unnamed Entity'
            ).replace(/\+/g, ' '),
          )}
        </a>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
