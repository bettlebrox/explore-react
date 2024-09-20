import { Theme } from '../interfaces/Theme';
import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CircularProgress,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFormattedDate } from '../utils/format';
import { iconThemeTypeMap } from '../utils/map';
import { Link } from 'react-router-dom';
import { UseMutationResult } from 'react-query';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export function ThemeItem({
  theme,
  expanded,
  isPlaceholderData: isPlaceholderData,
  onDeleteTheme,
}: {
  theme: Theme;
  expanded?: boolean;
  isPlaceholderData?: boolean;
  onDeleteTheme?: UseMutationResult<string, unknown, string, void>;
}) {
  const [waiting, setWaiting] = React.useState(false);
  const icon = waiting ? <CircularProgress size={16} /> : <FontAwesomeIcon icon={faXmark} />;
  const actions = (
    <CardActions>
      {onDeleteTheme ? <IconButton
        onClick={() => {
          if (onDeleteTheme) {
            setWaiting(true);
            onDeleteTheme.mutate(theme.title);
          }
        }}
        disabled={waiting}
        size="small"
      >
          {icon}
        </IconButton>
       : null}
    </CardActions>
  );
  let subheader = <></>;
  let avatar: JSX.Element | null = null;
  if (expanded) {
    avatar = isPlaceholderData ? (
      <IconButton>
        <Skeleton animation="wave" variant="circular" width={32} height={32} />
      </IconButton>
    ) : (
      <IconButton>
        <FontAwesomeIcon icon={iconThemeTypeMap[theme.source]} />
      </IconButton>
    );
    subheader = isPlaceholderData ? (
      <>
        <Typography variant="body2" align="left">
          <Skeleton animation="wave" variant="text" width={200} />
        </Typography>
        <Typography variant="body2" align="left">
          <Skeleton animation="wave" variant="text" width={200} />
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="body2" align="left">
          {getFormattedDate(theme.updated_at)}
        </Typography>
        <Typography variant="body2" align="left">
          {theme.summary}
        </Typography>
      </>
    );
  }
  return (
    <Card className="theme-item" variant="outlined" sx={{ minWidth: 200, display: 'flex' }}>
      <CardActionArea component={Link} to={'/theme/' + theme.title}>
        <CardHeader
          title={
            isPlaceholderData ? (
              <Skeleton animation="wave" variant="text" width={200} />
            ) : (
              <Typography>{theme.original_title}</Typography>
            )
          }
          align="left"
          subheader={subheader}
          avatar={avatar}
        />
      </CardActionArea>
      {actions}
    </Card>
  );
}
