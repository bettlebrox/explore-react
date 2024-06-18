import { Typography } from "@mui/material";
import { Article } from "../interfaces/Article";
import { ArticleItem } from "./ArticleItem";

export function ArticleList({ articles, expanded }: { articles: Article[], expanded?:boolean }) {
    return (
      <div className="article-list">
        {articles.map((article) => {
          return <ArticleItem key={article.id} article={article} expanded={expanded} />;
        })}
      </div>
    );
  }
export function ArticleGroup({ title, articles, expanded }: { title: string; articles: Article[], expanded?: boolean }) {
    return (
      <div className="article-group">
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        <ArticleList articles={articles} expanded={expanded}/>
      </div>
    );
  }