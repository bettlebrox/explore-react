import { Article } from "../interfaces/Article";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconThemeTypeMap } from "../utils/map";
import { getBreadcrumbs } from "../utils/format";

export function ArticleItem({
  article,
  expanded,
}: {
  article: Article;
  expanded?: boolean;
}) {
  const actions = <></>;
  let content = <></>;
  const favicon = <img src={'https://logo.clearbit.com/'+getBreadcrumbs(article.url)+'?size=28'}></img>;
  if (expanded) {
    content = (
      <CardContent>
        <Typography variant="body2" align="left">
          {article.summary}
        </Typography>
      </CardContent>
    );
  }
  return (
    <Card className="theme-item">
      <CardActionArea component={Link} href={article.url}>
        <CardHeader
          title={<Typography>{article.original_title}</Typography>}
          align="left"
          avatar={favicon}
        />
        {content}
        {actions}
      </CardActionArea>
    </Card>
  );
}
