import { Article } from "../interfaces/Article";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFormattedDate } from "../utils/format";
import { iconThemeTypeMap } from "../utils/map";

export function ArticleItem({
  article,
  expanded,
}: {
  article: Article;
  expanded?: boolean;
}) {
  const actions = <CardActions></CardActions>;
  let content = <CardContent></CardContent>;
  let avatar: JSX.Element | null = null;
  if (expanded) {
    content = (
      <CardContent>
        <Typography variant="body2" align="left">
          {article.summary}
        </Typography>
      </CardContent>
    );
    avatar = (
      <IconButton>
        <FontAwesomeIcon icon={iconThemeTypeMap[article.source]} />
      </IconButton>
    );
  }
  return (
    <Card className="theme-item">
      <CardActionArea component={Link} href={article.url}>
        <CardHeader
          title={<Typography>{article.original_title}</Typography>}
          align="left"
          avatar={avatar}
        />
        {content}
        {actions}
      </CardActionArea>
    </Card>
  );
}
