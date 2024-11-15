import { Handle, Position } from '@xyflow/react';
import { getFormattedDate } from '../utils/format';
import { getBreadcrumbs } from '../utils/format';
import { Box, Link, Typography } from '@mui/material';

interface EntityNodeData {
  '~properties'?: {
    name?: string;
    title?: string;
    url?: string;
    created_at?: string;
  };
  '~labels'?: string[];
}

export default function ArticleNode({ data }: { data: EntityNodeData }) {
  return (
    <Box
      sx={{
        padding: '10px',
        borderRadius: '5px',
        background: 'rgb(233, 251, 150)',
        border: '1px solid #ddd',
        width: '150px',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Box
        sx={{
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
        title={JSON.stringify(
          data,
          ['title', '~labels', '~properties', 'domain', 'created_at', 'updated_at', 'url'],
          2,
        )}
      >
        <Link noWrap href={data['~properties']?.url}>
          {(() => {
            const text = decodeURIComponent(
              (
                data['~properties']?.title ||
                data['~properties']?.name ||
                data['~labels']?.[0] ||
                'Unnamed Entity'
              ).replace(/\+/g, ' '),
            );
            return text.length > 30 ? text.slice(0, 30) + '...' : text;
          })()}
        </Link>
        <Typography noWrap variant="caption" color="text.secondary">
          {getBreadcrumbs(data['~properties']?.url || '').join(' > ')}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {getFormattedDate(data['~properties']?.created_at || '')}
        </Typography>
      </Box>
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
}
