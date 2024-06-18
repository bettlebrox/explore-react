import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, IconButton, Typography } from "@mui/material";
import { iconRelTypeMap } from "../utils/map";

export function RelSummary({ type, count }: { type: string; count: number }) {
  const icon = (<FontAwesomeIcon icon={iconRelTypeMap[type]} />)
  return (
      <Chip avatar={icon} label={count} size="small"/>
  );
}
