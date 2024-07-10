import { Article } from "../interfaces/Article";
import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { getBreadcrumbs } from "../utils/format";

export function ArticleItem({ article, isPlaceholderData }: { article: Article, isPlaceholderData: boolean }) {
  const actions = <></>;
  const favicon = !isPlaceholderData?(
    <img
      src={
        "https://logo.clearbit.com/" +
        getBreadcrumbs(article.url)[0] +
        "?size=28"
      }
    ></img>
  ):(<Skeleton variant="circular" width={32} height={32}></Skeleton>);
  return (
    <Card className="theme-item">
      <CardActionArea component={Link} href={article.url}>
        <CardHeader
          title={
          !isPlaceholderData?(<Typography>{article.original_title}</Typography>):(<Skeleton variant="text" animation="wave" width={200}></Skeleton> )}
          align="left"
          avatar={favicon}
          subheader={
            !isPlaceholderData?(<>
              <Box sx={{ maxWidth: 300 }}>
                <Typography noWrap>
                  {getBreadcrumbs(article.url).join(" > ")}
                </Typography>
              </Box>
              <Box sx={{ maxWidth: 750 }}>
                <Typography>{article.summary}</Typography>
              </Box>
            </>):(<Skeleton variant="text" animation="wave" width={200}></Skeleton>)
          }
        />
        {actions}
      </CardActionArea>
    </Card>
  );
}
