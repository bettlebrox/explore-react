import { Article } from '../interfaces/Article';
import { Box, Card, CardActionArea, CardHeader, Link, Skeleton, Stack, Typography } from '@mui/material';
import { getBreadcrumbs, getFormattedDate } from '../utils/format';
import ThemeChips from './ThemeChips';

export function ArticleItem({
  article,
  isPlaceholderData,
  detailed,
}: {
  article: Article;
  isPlaceholderData: boolean;
  detailed?: boolean;
}) {
  const actions = <></>;
  const favicon = !isPlaceholderData ? (
    <img src={'https://logo.clearbit.com/' + getBreadcrumbs(article.url)[0] + '?size=28'}></img>
  ) : (
    <Skeleton variant="circular" width={32} height={32}></Skeleton>
  );
  return (
    <Card className="theme-item">
      <CardActionArea component={Link} href={article.url}>
        <CardHeader
          title={
            !isPlaceholderData ? (
              <Typography>{article.original_title}</Typography>
            ) : (
              <Skeleton variant="text" animation="wave" width={200}></Skeleton>
            )
          }
          align="left"
          avatar={favicon}
          subheader={
            !isPlaceholderData ? (
              <>
                <Box sx={{ maxWidth: 300 }}>
                  <Typography noWrap>{getBreadcrumbs(article.url).join(' > ')}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {getFormattedDate(article.logged_at)}
                  </Typography>
                </Box>
                <Box sx={{ maxWidth: 750 }}>
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {article.summary}
                  </Typography>
                </Box>
              </>
            ) : (
              <Skeleton variant="text" animation="wave" width={200}></Skeleton>
            )
          }
        />
        {actions}
      </CardActionArea>
      {!isPlaceholderData && detailed ? (
        <Stack direction={'row'} sx={{ maxWidth: 750 }}>
          <ThemeChips themes={article.themes}></ThemeChips>
        </Stack>
      ) : (
        <></>
      )}
    </Card>
  );
}
