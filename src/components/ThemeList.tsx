import { Typography } from '@mui/material';
import { Theme } from '../interfaces/Theme';
import { ThemeItem } from './ThemeItem';
import { del } from 'aws-amplify/api';
import { useMutation, useQueryClient } from 'react-query';

async function delTheme(title: string) {
  try {
    const restOperation = del({
      apiName: 'Dassie',
      path: '/api/themes/' + title,
    });
    await restOperation.response;
    console.log('DELETE call succeeded');
  } catch (error) {
    console.log('DELETE call failed: ');
  }
}

export function ThemeList({
  params,
  expanded,
  textFilter,
  themes,
  isPlaceholderData,
  error,
  limit,
}: {
  params: Record<string, string>;
  expanded?: boolean;
  textFilter?: string;
  themes: Theme[];
  isPlaceholderData: boolean;
  error: Error | null;
  limit?: number;
}) {
  const queryClient = useQueryClient();

  const deleteTheme = useMutation({
    mutationFn: async (title: string) => {
      await delTheme(title);
      queryClient.invalidateQueries(['themes', params]);
      return title;
    },
    onMutate: () => {
      queryClient.cancelQueries(['themes', params]);
    },
  });
  if (error || !themes) return <Typography align="left">Error</Typography>;
  return (
    <>
      {themes
        .filter((theme) => theme.original_title.toLowerCase().includes(textFilter || ''))
        .slice(0, limit)
        .map((theme) => {
          return (
            <ThemeItem
              key={theme.id}
              theme={theme}
              expanded={expanded}
              isPlaceholderData={isPlaceholderData}
              onDeleteTheme={deleteTheme}
            />
          );
        })}
    </>
  );
}
export function ThemeGroup({
  title,
  expanded,
  params,
  themes,
  isPlaceholderData,
  error,
  textFilter,
  limit,
}: {
  title: string;
  expanded?: boolean;
  params: Record<string, string>;
  themes: Theme[];
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
      <ThemeList
        expanded={expanded}
        params={params}
        themes={themes}
        isPlaceholderData={isPlaceholderData}
        error={error}
        textFilter={textFilter}
        limit={limit}
      />
    </>
  );
}
