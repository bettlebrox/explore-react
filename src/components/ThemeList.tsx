import { Typography } from '@mui/material';
import { Theme } from '../interfaces/Theme';
import { ThemeItem } from './ThemeItem';
import { ThemeForm } from './ThemeForm';
import { del, post } from 'aws-amplify/api';
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

export function ThemeList({
  params,
  expanded,
  textFilter,
  themes,
  isPlaceholderData,
  error,
}: {
  params: Record<string, string>;
  expanded?: boolean;
  textFilter?: string;
  themes: Theme[];
  isPlaceholderData: boolean;
  error: Error | null;
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
  addForm,
  textFilter,
}: {
  title: string;
  expanded?: boolean;
  params: Record<string, string>;
  themes: Theme[];
  isPlaceholderData: boolean;
  error: Error | null;
  addForm?: boolean;
  textFilter?: string;
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
      <ThemeList
        expanded={expanded}
        params={params}
        themes={themes}
        isPlaceholderData={isPlaceholderData}
        error={error}
        textFilter={textFilter}
      />
    </>
  );
}
