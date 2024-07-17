import { Typography } from "@mui/material";
import { Article } from "../interfaces/Article";
import { ArticleItem } from "./ArticleItem";

export function ArticleList({
  articles,
  isPlaceholderData,
  detailed,
}: {
  articles: Article[] | undefined;
  isPlaceholderData: boolean;
  detailed?: boolean;
}) {
  return (
    <div className="article-list">
      {articles ? (
        articles.map((article) => {
          return (
            <ArticleItem key={article.id} article={article} isPlaceholderData={isPlaceholderData} detailed={detailed} />
          );
        })
      ) : (
        <Typography>No related articles</Typography>
      )}
    </div>
  );
}
export function ArticleGroup({
  title,
  articles,
  isPlaceholderData,
  detailed,
}: {
  title: string;
  articles: Article[] | undefined;
  isPlaceholderData: boolean;
  detailed?: boolean;
}) {
  return (
    <div className="article-group">
      <Typography variant="h6" align="left">
        {title}
      </Typography>
      <ArticleList articles={articles} isPlaceholderData={isPlaceholderData} detailed={detailed} />
    </div>
  );
}
