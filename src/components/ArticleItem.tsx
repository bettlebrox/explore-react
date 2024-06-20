import { Article } from "../interfaces/Article";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
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
  const favicon = <img src={'https://logo.clearbit.com/'+getBreadcrumbs(article.url)[0]+'?size=28'}></img>;
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
          subheader={getBreadcrumbs(article.url).join(" > ")}
        />
        {content}
        {actions}
      </CardActionArea>
    </Card>
  );
}
