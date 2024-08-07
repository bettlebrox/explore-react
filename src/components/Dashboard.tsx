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
    max: '3',
  };
  const recentThemesQueryParams = {
    sortField: 'updated_at',
    max: '3',
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={6}>
          <ThemeGroup title="Top Themes" expanded params={topThemesQueryParams} />
        </Grid>
        <Grid item={true} xs={6}>
          <ThemeGroup title="Recent Themes" expanded params={recentThemesQueryParams} />
        </Grid>
        <Grid item={true} xs={6}>
          <ThemeGroup title="Custom Themes" expanded params={customThemesQueryParams} addForm />
        </Grid>
        <Grid item={true} xs={6}></Grid>
      </Grid>
    </>
  );
}
