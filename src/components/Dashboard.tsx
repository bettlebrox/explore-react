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
    max: '5',
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={6}>
          <ThemeGroup title="Recently Browsed Themes" expanded params={recentlyBrowsedThemesQueryParams} />
        </Grid>
        <Grid item={true} xs={6}>
          <ThemeGroup title="Top Themes" expanded params={topThemesQueryParams} />
        </Grid>
        <Grid item={true} xs={6}>
          <ThemeGroup title="Custom Themes" expanded params={customThemesQueryParams} addForm />
        </Grid>
      </Grid>
    </>
  );
}
