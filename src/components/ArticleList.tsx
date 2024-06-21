import { Typography } from "@mui/material";
import { Article } from "../interfaces/Article";
import { ArticleItem } from "./ArticleItem";

export function ArticleList({ articles }: { articles: Article[], }) {
    return (
      <div className="article-list">
        {articles.map((article) => {
          return <ArticleItem key={article.id} article={article} />;
        })}
      </div>
    );
  }
export function ArticleGroup({ title, articles }: { title: string; articles: Article[] }) {
    return (
      <div className="article-group">
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        <ArticleList articles={articles} />
      </div>
    );
  }