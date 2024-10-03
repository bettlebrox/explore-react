import { Article } from '../interfaces/Article';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CircularProgress,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { getBreadcrumbs, getFormattedDate } from '../utils/format';
import ThemeChips from './ThemeChips';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UseMutateFunction } from 'react-query';
import React from 'react';

export function ArticleItem({
  article,
  isPlaceholderData,
  detailed,
  onDeleteRelated,
}: {
  article: Article;
  isPlaceholderData: boolean;
  detailed?: boolean;
  onDeleteRelated?: UseMutateFunction<void, unknown, string, void>;
}) {
  const [waiting, setWaiting] = React.useState(false);
  const icon = waiting ? <CircularProgress size={16} /> : <FontAwesomeIcon icon={faTrash} />;
  const actions = (
    <CardActions>
      {onDeleteRelated ? (
        <IconButton
          size="small"
          onClick={() => {
            setWaiting(true);
            onDeleteRelated?.(article.id);
          }}
        >
          {icon}
        </IconButton>
      ) : null}
    </CardActions>
  );
  const favicon = !isPlaceholderData ? (
    <img src={'https://logo.clearbit.com/' + getBreadcrumbs(article.url)[0] + '?size=28'}></img>
  ) : (
    <Skeleton variant="circular" width={32} height={32}></Skeleton>
  );
  return (
    <Card className="theme-item" sx={{ display: 'flex' }}>
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
                {article.score ? (
                  <Typography variant="body2" align="right">
                    {article.score}
                  </Typography>
                ) : null}
              </>
            ) : (
              <Skeleton variant="text" animation="wave" width={200}></Skeleton>
            )
          }
        />
      </CardActionArea>
      {!isPlaceholderData ? (
        <>
          {actions}
          {detailed ? (
            <Box>
              <Stack direction={'row'} sx={{ maxWidth: 750 }}>
                <ThemeChips themes={article.themes}></ThemeChips>
              </Stack>
            </Box>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </Card>
  );
}
