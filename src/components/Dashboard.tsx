import { Grid } from '@mui/material';
import { ThemeGroup } from './ThemeList';
import React, { useState } from 'react';
import { get, post } from 'aws-amplify/api';
import { Theme } from '../interfaces/Theme';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom'; // Add this import
import { CommandBar } from './CommandBar';

interface SearchOption {
  inputValue?: string;
  title: string;
  original_title: string;
  source?: string;
  id?: string;
}
const defaultItems = 25;
async function postItem(title: string, handleSubmitComplete: (response: Theme | Error) => void) {
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
    const response = (await body.json()) as unknown as Theme; // Cast to unknown first
    handleSubmitComplete(response);
    console.log('POST call succeeded');
    console.log(response);
  } catch (error) {
    console.log('POST call failed: ');
    handleSubmitComplete(error instanceof Error ? error : new Error('Unknown error'));
  }
}

const getThemes = async ({ queryParams }: { queryParams: Record<string, string> }) => {
  queryParams['sortField'] = queryParams['sortField'] || 'count_association';
  queryParams['max'] = queryParams['max'] || defaultItems.toString();
  const { body } = await get({
    apiName: 'Dassie',
    path: '/api/themes',
    options: {
      queryParams: queryParams,
    },
  }).response;
  return JSON.parse(await body.text()) as Theme[];
};
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
export function Dashboard() {
  const navigate = useNavigate(); // Initialize navigate
  const customThemesQueryParams = {
    sortField: 'count_association',
    max: defaultItems.toString(),
    source: 'custom',
  };
  const topThemesQueryParams = {
    sortField: 'count_association',
    max: defaultItems.toString(),
  };
  const recentlyBrowsedThemesQueryParams = {
    sortField: 'recently_browsed',
    source: 'custom,tab_thread,search_term',
    max: defaultItems.toString(),
  };
  const queryClient = useQueryClient();
  const [loadingNewTheme, setLoadingNewTheme] = useState(false);
  const addTheme = useMutation({
    mutationFn: async (title: string) => {
      await postItem(title, (response) => {
        queryClient.invalidateQueries(['themes', customThemesQueryParams]);
        if (response && 'title' in response) {
          navigate(`/theme/${response.title}`);
        } else {
          console.error('Invalid response: title is missing');
        }
      });
      return title;
    },
    onMutate: () => {
      queryClient.cancelQueries(['themes', customThemesQueryParams]);
    },
  });
  const {
    data: customThemes,
    error: customThemesError,
    isPlaceholderData: customThemesIsPlaceholderData,
  } = useQuery<Theme[]>(
    ['themes', customThemesQueryParams],
    () => getThemes({ queryParams: customThemesQueryParams }),
    {
      placeholderData: getPlaceHolderThemes(),
    },
  );
  const {
    data: recentlyBrowsedThemes,
    error: recentlyBrowsedThemesError,
    isPlaceholderData: recentlyBrowsedThemesIsPlaceholderData,
  } = useQuery<Theme[]>(
    ['themes', recentlyBrowsedThemesQueryParams],
    () => getThemes({ queryParams: recentlyBrowsedThemesQueryParams }),
    {
      placeholderData: getPlaceHolderThemes(),
    },
  );
  const {
    data: topThemes,
    error: topThemesError,
    isPlaceholderData: topThemesIsPlaceholderData,
  } = useQuery<Theme[]>(['themes', topThemesQueryParams], () => getThemes({ queryParams: topThemesQueryParams }), {
    placeholderData: getPlaceHolderThemes(),
  });
  const searchOptions = React.useMemo<SearchOption[]>(
    () =>
      [
        ...(recentlyBrowsedThemes?.map((theme) => ({
          id: theme.id,
          title: theme.title,
          original_title: theme.original_title,
          source: 'recently_browsed',
        })) || []),
        ...(customThemes?.map((theme) => ({
          id: theme.id,
          title: theme.title,
          original_title: theme.original_title,
          source: 'custom',
        })) || []),
        ...(topThemes?.map((theme) => ({
          id: theme.id,
          title: theme.title,
          original_title: theme.original_title,
          source: 'top',
        })) || []),
      ].filter((value, index, self) => index === self.findIndex((t) => t.id === value.id)),
    [recentlyBrowsedThemes, customThemes, topThemes],
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={12}>
          <CommandBar
            setLoadingNewTheme={setLoadingNewTheme}
            loadingNewTheme={loadingNewTheme}
            searchOptionsList={searchOptions}
            addTheme={addTheme}
          />
        </Grid>
        <Grid item={true} xs={4}>
          <ThemeGroup
            title="Recently Browsed Topics"
            params={recentlyBrowsedThemesQueryParams}
            themes={recentlyBrowsedThemes || []}
            isPlaceholderData={recentlyBrowsedThemesIsPlaceholderData}
            error={recentlyBrowsedThemesError as Error | null}
            limit={7}
          />
        </Grid>
        <Grid item={true} xs={4}>
          <ThemeGroup
            title="Custom Topics"
            params={customThemesQueryParams}
            themes={customThemes || []}
            isPlaceholderData={customThemesIsPlaceholderData}
            error={customThemesError as Error | null}
            limit={7}
          />
        </Grid>
        <Grid item={true} xs={4}>
          <ThemeGroup
            title="Top Topics"
            params={topThemesQueryParams}
            themes={topThemes || []}
            isPlaceholderData={topThemesIsPlaceholderData}
            error={topThemesError as Error | null}
            limit={7}
          />
        </Grid>
      </Grid>
    </>
  );
}
