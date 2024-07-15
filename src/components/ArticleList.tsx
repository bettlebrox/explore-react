import { Typography } from "@mui/material";
import { Article } from "../interfaces/Article";
import { ArticleItem } from "./ArticleItem";

export function ArticleList({ articles, isPlaceholderData }: { articles: Article[]; isPlaceholderData: boolean }) {
  return (
    <div className="article-list">
      {articles ? (
        articles.map((article) => {
          return <ArticleItem key={article.id} article={article} isPlaceholderData={isPlaceholderData} />;
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
}: {
  title: string;
  articles: Article[];
  isPlaceholderData: boolean;
}) {
  return (
    <div className="article-group">
      <Typography variant="h6" align="left">
        {title}
      </Typography>
      <ArticleList articles={articles} isPlaceholderData={isPlaceholderData} />
    </div>
  );
}
