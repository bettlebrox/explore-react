import { Article } from "../interfaces/Article";
import {
  Card,
  CardActionArea,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import { getBreadcrumbs } from "../utils/format";

export function ArticleItem({
  article,
}: {
  article: Article;
}) {
  const actions = <></>;
  const favicon = <img src={'https://logo.clearbit.com/'+getBreadcrumbs(article.url)[0]+'?size=28'}></img>;
  return (
    <Card className="theme-item">
      <CardActionArea component={Link} href={article.url}>
        <CardHeader
          title={<Typography>{article.original_title}</Typography>}
          align="left"
          avatar={favicon}
          subheader={<>{getBreadcrumbs(article.url).join(' > ')}<Typography>{article.summary}</Typography></>}
        />
        {actions}
      </CardActionArea>
    </Card>
  );
}
