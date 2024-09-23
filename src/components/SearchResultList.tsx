import { Typography } from '@mui/material';
import { ThemeItem } from './ThemeItem';
import { SearchResult } from '../interfaces/SearchResult';
import { ArticleItem } from './ArticleItem';
import { ActionItem } from './ActionItem';

export function SearchResultList({
  expanded,
  textFilter,
  result,
  isPlaceholderData,
  error,
  limit,
  query,
}: {
  expanded?: boolean;
  textFilter?: string;
  result: SearchResult | undefined;
  isPlaceholderData: boolean;
  error: Error | null;
  limit?: number;
  query: string | undefined;
}) {
  if (error || !result) return <Typography align="left">Error</Typography>;

  return (
    <>
      {query && <ActionItem actionName="claude" query={query} />}
      {query && <ActionItem actionName="perplexity" query={query} />}
      {query && <ActionItem actionName="google" query={query} />}
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
  query,
}: {
  title: string;
  expanded?: boolean;
  result: SearchResult | undefined;
  isPlaceholderData: boolean;
  error: Error | null;
  textFilter?: string;
  limit?: number;
  query: string | undefined;
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
        query={query}
      />
    </>
  );
}
