import { DassieItem } from "../interfaces/Theme";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
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
  const actions = <CardActions></CardActions>;
  let content = <CardContent></CardContent>;
  let avatar: JSX.Element | null = null;
  if (expanded) {
    content = (
      <CardContent>
        <Typography variant="body2" align="left">
          {theme.summary}
        </Typography>
      </CardContent>
    );
    avatar = (
      <IconButton>
        <FontAwesomeIcon icon={iconThemeTypeMap[theme.source]} />
      </IconButton>
    );
  }
  return (
    <Card className="theme-item" variant="outlined" raised>
      <CardActionArea component={Link} to={"/theme/" + theme.title}>
        <CardHeader
          title={<Typography>{theme.original_title}</Typography>}
          align="left"
          subheader={expanded ? getFormattedDate(theme.created_at) : ""}
          avatar={avatar}
        />
        {content}
        {actions}
      </CardActionArea>
    </Card>
  );
}
