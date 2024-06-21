import { DassieItem } from "../interfaces/Theme";
import {
  Card,
  CardActionArea,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFormattedDate } from "../utils/format";
import { iconThemeTypeMap } from "../utils/map";
import { Link } from "react-router-dom";

export function ThemeItem({
  theme,
  expanded,
}: {
  theme: DassieItem;
  expanded?: boolean;
}) {
  const actions = <></>;
  let subheader = <></>;
  let avatar: JSX.Element | null = null;
  if (expanded) {
    avatar = (
      <IconButton>
        <FontAwesomeIcon icon={iconThemeTypeMap[theme.source]} />
      </IconButton>
    );
    subheader = (
      <>
        <Typography variant="body2" align="left">
          {getFormattedDate(theme.created_at)}
        </Typography>
        <Typography variant="body2" align="left">
          {theme.summary}
        </Typography>
      </>
    );
  }
  return (
    <Card className="theme-item" variant="outlined">
      <CardActionArea component={Link} to={"/theme/" + theme.title}>
        <CardHeader
          title={<Typography>{theme.original_title}</Typography>}
          align="left"
          subheader={subheader}
          avatar={avatar}
        />
        {actions}
      </CardActionArea>
    </Card>
  );
}
