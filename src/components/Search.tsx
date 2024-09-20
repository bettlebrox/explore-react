import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { get, post } from 'aws-amplify/api';
import { Theme } from '../interfaces/Theme';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom'; // Add this import
import { CommandBar } from './CommandBar';
import { SearchResult } from '../interfaces/SearchResult';
import { SearchResultGroup } from './SearchResultList';

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

const getSearchResult = async ({ queryParams }: { queryParams: Record<string, string> }) => {
  queryParams['sortField'] = queryParams['sortField'] || 'count_association';
  queryParams['max'] = queryParams['max'] || defaultItems.toString();
  queryParams['query'] = queryParams['query'] || '';
  const { query, ...restParams } = queryParams;
  const { body } = await get({
    apiName: 'Dassie',
    path: '/api/search/' + query,
    options: {
      queryParams: restParams,
    },
  }).response;
  return JSON.parse(await body.text()) as SearchResult;
};
function getPlaceHolderSearchResult(): SearchResult {
  return {
    themes: new Array<Theme>(3)
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
      .map((theme, index) => ({ ...theme, id: index.toString() })),
    articles: [],
  };
}
export function Search() {
  const { query } = useParams<{ query: string }>();
  const navigate = useNavigate(); // Initialize navigate
  const searchQueryParams = {
    sortField: 'count_association',
    max: defaultItems.toString(),
    query: query || '',
  };
  const [loadingNewTheme, setLoadingNewTheme] = useState(false);
  const queryClient = useQueryClient();
  const addTheme = useMutation({
    mutationFn: async (title: string) => {
      await postItem(title, (response) => {
        queryClient.invalidateQueries(['search', searchQueryParams]);
        if (response && 'title' in response) {
          navigate(`/theme/${response.title}`);
        } else {
          console.error('Invalid response: title is missing');
        }
      });
      return title;
    },
    onMutate: () => {
      queryClient.cancelQueries(['search', searchQueryParams]);
    },
  });
  const {
    data: searchResult,
    error: searchResultError,
    isPlaceholderData: searchResultIsPlaceholderData,
  } = useQuery<SearchResult>(['search', searchQueryParams], () => getSearchResult({ queryParams: searchQueryParams }), {
    placeholderData: getPlaceHolderSearchResult(),
  });
  const searchOptions = React.useMemo<SearchOption[]>(
    () =>
      [
        ...(searchResult?.themes?.map((theme) => ({
          id: theme.id,
          title: theme.title,
          original_title: theme.original_title,
          source: 'top',
        })) || []),
      ].filter((value, index, self) => self.indexOf(value) === index),
    [searchResult?.themes],
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={12}>
          <CommandBar
            searchOptionsList={searchOptions}
            loadingNewTheme={loadingNewTheme}
            setLoadingNewTheme={setLoadingNewTheme}
            addTheme={addTheme}
          />
        </Grid>
        <Grid item={true} xs={12}>
          <SearchResultGroup
            title="Search Results"
            result={searchResult}
            expanded={true}
            isPlaceholderData={searchResultIsPlaceholderData}
            error={searchResultError as Error | null}
            limit={7}
          />
        </Grid>
      </Grid>
    </>
  );
}
