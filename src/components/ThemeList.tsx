import { Typography } from '@mui/material';
import { Theme } from '../interfaces/Theme';
import { ThemeItem } from './ThemeItem';
import { useMemo } from 'react';
import { del, get } from 'aws-amplify/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const getThemes = async ({ queryParams }: { queryParams: Record<string, string> }) => {
  queryParams['sortField'] = queryParams['sortField'] || 'count_association';
  queryParams['max'] = queryParams['max'] || '3';
  const { body } = await get({
    apiName: 'Dassie',
    path: '/api/themes',
    options: {
      queryParams: queryParams,
    },
  }).response;
  return JSON.parse(await body.text()) as Theme[];
};

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

function getPlaceHolderThemes(): Theme[] {
  return new Array<Theme>(3)
    .fill({
      id: '1',
      source: 'skeleton',
      recurrent_count: 0,
      sporadic_count: 0,
      article_count: 0,
      title: '',
      original_title: '',
      summary: null,
      created_at: '',
      updated_at: '',
    })
    .map((theme, index) => ({ ...theme, id: index.toString() }));
}
export function ThemeList({ params, expanded }: { params: Record<string, string>; expanded?: boolean }) {
  const placeholderThemes = useMemo(() => getPlaceHolderThemes(), []);
  const queryClient = useQueryClient();
  const deleteTheme = useMutation({
    mutationFn: async (title: string) => {
      await delTheme(title);
      return title;
    },
    onMutate: () => {
      queryClient.cancelQueries(['themes', params]);
    },
  });
  const {
    data: themes,
    error: error,
    isPlaceholderData: isPlaceholderData,
  } = useQuery<Theme[]>(['themes', params], () => getThemes({ queryParams: params }), {
    placeholderData: placeholderThemes,
  });
  if (error || !themes) return <Typography align="left">Error</Typography>;
  return (
    <>
      {themes.map((theme) => {
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
  children,
}: {
  title: string;
  expanded?: boolean;
  params: Record<string, string>;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Typography variant="h6" align="left">
        {title}
      </Typography>
      {children}
      <ThemeList expanded={expanded} params={params} />
    </>
  );
}
