import { Typography } from '@mui/material';
import { Theme } from '../interfaces/Theme';
import { ThemeItem } from './ThemeItem';
import { ThemeForm } from './ThemeForm';
import { useMemo } from 'react';
import { del, get, post } from 'aws-amplify/api';
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

async function postItem(title: string, handleSubmitComplete: () => void) {
  try {
    const restOperation = post({
      apiName: 'Dassie',
      path: '/api/themes',
      options: {
        body: {
          title: title,
        },
      },
    });

    const { body } = await restOperation.response;
    const response = await body.json();
    handleSubmitComplete();
    console.log('POST call succeeded');
    console.log(response);
  } catch (error) {
    console.log('POST call failed: ');
    handleSubmitComplete();
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
      queryClient.invalidateQueries(['themes', params]);
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
  addForm,
}: {
  title: string;
  expanded?: boolean;
  params: Record<string, string>;
  addForm?: boolean;
}) {
  const queryClient = useQueryClient();
  const addTheme = useMutation({
    mutationFn: async (title: string) => {
      await postItem(title, () => {});
      queryClient.invalidateQueries(['themes', params]);
      return title;
    },
    onMutate: () => {
      queryClient.cancelQueries(['themes', params]);
    },
  });
  return (
    <>
      <Typography variant="h6" align="left">
        {title}
      </Typography>
      {addForm && <ThemeForm onAddTheme={addTheme} />}
      <ThemeList expanded={expanded} params={params} />
    </>
  );
}
