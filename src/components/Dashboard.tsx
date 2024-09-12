import { Autocomplete, Grid, TextField } from '@mui/material';
import { ThemeGroup } from './ThemeList';
import React from 'react';
import { get } from 'aws-amplify/api';
import { Theme } from '../interfaces/Theme';
import { useQuery } from 'react-query';
const defaultItems = 7;
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
  const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={12}>
          <form>
            <Autocomplete
              freeSolo
              options={[]}
              renderInput={(params) => <TextField {...params} label="Search" />}
              onInputChange={(_event, newInputValue) => {
                setSearchTerm(newInputValue);
              }}
            />
          </form>
        </Grid>
        <Grid item={true} xs={4}>
          <ThemeGroup
            title="Recently Browsed Themes"
            params={recentlyBrowsedThemesQueryParams}
            themes={recentlyBrowsedThemes || []}
            isPlaceholderData={recentlyBrowsedThemesIsPlaceholderData}
            error={recentlyBrowsedThemesError}
            textFilter={searchTerm}
          />
        </Grid>
        <Grid item={true} xs={4}>
          <ThemeGroup
            title="Custom Themes"
            params={customThemesQueryParams}
            themes={customThemes || []}
            isPlaceholderData={customThemesIsPlaceholderData}
            error={customThemesError}
            textFilter={searchTerm}
          />
        </Grid>
        <Grid item={true} xs={4}>
          <ThemeGroup
            title="Top Themes"
            params={topThemesQueryParams}
            themes={topThemes || []}
            isPlaceholderData={topThemesIsPlaceholderData}
            error={topThemesError}
            textFilter={searchTerm}
          />
        </Grid>
      </Grid>
    </>
  );
}
