import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip } from '@mui/material';
import { iconRelTypeMap } from '../utils/map';

export function RelSummary({ type, relArray }: { type: string; relArray: unknown[] }) {
  const icon = <FontAwesomeIcon icon={iconRelTypeMap[type]} />;
  return <Chip avatar={icon} label={relArray ? relArray.length : 0} size="small" />;
}
