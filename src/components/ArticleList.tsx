import { Typography } from '@mui/material';
import { Article } from '../interfaces/Article';
import { ArticleItem } from './ArticleItem';

export function ArticleList({
  articles,
  isPlaceholderData,
  detailed,
  onDeleteRelated,
}: {
  articles: Article[] | undefined;
  isPlaceholderData: boolean;
  detailed?: boolean;
  onDeleteRelated?: (id: string) => void;
}) {
  return (
    <div className="article-list">
      {articles ? (
        articles.map((article) => {
          return (
            <ArticleItem
              key={article.id}
              article={article}
              isPlaceholderData={isPlaceholderData}
              detailed={detailed}
              onDeleteRelated={onDeleteRelated}
            />
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
  onDeleteRelated,
}: {
  title: string;
  articles: Article[] | undefined;
  isPlaceholderData: boolean;
  detailed?: boolean;
  onDeleteRelated?: (id: string) => void;
}) {
  return (
    <div className="article-group">
      <Typography variant="h6" align="left">
        {title}
      </Typography>
      <ArticleList
        articles={articles}
        isPlaceholderData={isPlaceholderData}
        detailed={detailed}
        onDeleteRelated={onDeleteRelated}
      />
    </div>
  );
}
