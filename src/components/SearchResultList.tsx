import { Typography } from '@mui/material';
import { ThemeItem } from './ThemeItem';
import { SearchResult } from '../interfaces/SearchResult';
import { ArticleItem } from './ArticleItem';

export function SearchResultList({
  expanded,
  textFilter,
  result,
  isPlaceholderData,
  error,
  limit,
}: {
  expanded?: boolean;
  textFilter?: string;
  result: SearchResult | undefined;
  isPlaceholderData: boolean;
  error: Error | null;
  limit?: number;
}) {
  if (error || !result) return <Typography align="left">Error</Typography>;

  return (
    <>
      {result.themes
        .filter((theme) => theme.original_title.toLowerCase().includes(textFilter || ''))
        .slice(0, limit)
        .map((theme) => {
          return <ThemeItem key={theme.id} theme={theme} expanded={expanded} isPlaceholderData={isPlaceholderData} />;
        })}
      {result.articles
        .filter((article) => article.original_title.toLowerCase().includes(textFilter || ''))
        .slice(0, limit)
        .map((article) => {
          return <ArticleItem key={article.id} article={article} isPlaceholderData={isPlaceholderData} />;
        })}
    </>
  );
}
export function SearchResultGroup({
  title,
  expanded,
  result,
  isPlaceholderData,
  error,
  textFilter,
  limit,
}: {
  title: string;
  expanded?: boolean;
  result: SearchResult | undefined;
  isPlaceholderData: boolean;
  error: Error | null;
  textFilter?: string;
  limit?: number;
}) {
  return (
    <>
      <Typography variant="h6" align="left">
        {title}
      </Typography>
      <SearchResultList
        expanded={expanded}
        result={result}
        isPlaceholderData={isPlaceholderData}
        error={error}
        textFilter={textFilter}
        limit={limit}
      />
    </>
  );
}
