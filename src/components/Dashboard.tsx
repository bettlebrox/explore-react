import { Grid } from '@mui/material';
import { ThemeGroup } from './ThemeList';

export function Dashboard() {
  const customThemesQueryParams = {
    sortField: 'count_association',
    max: '5',
    source: 'custom',
  };
  const topThemesQueryParams = {
    sortField: 'count_association',
    max: '5',
  };
  const recentlyBrowsedThemesQueryParams = {
    sortField: 'recently_browsed',
    source: 'custom,tab_thread,search_term',
    max: '5',
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={4}>
          <ThemeGroup title="Recently Browsed Themes" params={recentlyBrowsedThemesQueryParams} />
        </Grid>
        <Grid item={true} xs={4}>
          <ThemeGroup title="Top Themes" params={topThemesQueryParams} />
        </Grid>
        <Grid item={true} xs={4}>
          <ThemeGroup title="Custom Themes" params={customThemesQueryParams} addForm />
        </Grid>
      </Grid>
    </>
  );
}
