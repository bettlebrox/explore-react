import { ThemeDetail } from '../interfaces/ThemeDetail';
import { Box, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import { getFormattedDate } from '../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconThemeTypeMap } from '../utils/map';
import { RelSummary } from './RelSummary';
import { ArticleGroup } from './ArticleList';
import { Chatbot } from './Chatbot';
import { get } from 'aws-amplify/api';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { ThemeLinkList } from './ThemeLinkList';
import { useMemo } from 'react';
import { getPlaceHolderTheme } from '../utils/placeholder';

export function ThemeDetails() {
  const placeholderTheme = useMemo(() => getPlaceHolderTheme(), []);
  const { pathname } = useLocation();
  const themeTitle = pathname.split('/').pop();
  const getTheme = async () => {
    const { body } = await get({
      apiName: 'Dassie',
      path: '/api/themes/' + themeTitle,
    }).response;
    return JSON.parse(await body.text()) as ThemeDetail;
  };
  const {
    data: theme,
    error: error,
    isPlaceholderData: isPlaceholderData,
  } = useQuery<ThemeDetail>(themeTitle ? themeTitle : 'themeDetail', getTheme, { placeholderData: placeholderTheme });
  if (error) {
    console.log(error);
  }
  let recurrentText = <></>;
  if (!isPlaceholderData && theme && theme.recurrent && theme.recurrent.length > 0) {
    recurrentText = (
      <Typography align="left">
        <ThemeLinkList themes={theme.recurrent} /> also frequently appear in these articles.
      </Typography>
    );
  }
  let sporadicText = <></>;
  if (!isPlaceholderData && theme && theme.sporadic && theme.sporadic.length > 0) {
    sporadicText = (
      <Typography align="left">
        <ThemeLinkList themes={theme.sporadic} /> appears sporadically in some of these articles.
      </Typography>
    );
  }

  return theme ? (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={12}>
          <Card>
            <CardHeader
              title={
                !isPlaceholderData ? (
                  <Typography variant="h5">{theme.original_title}</Typography>
                ) : (
                  <Skeleton animation="wave" variant="text" width={200}></Skeleton>
                )
              }
              align="left"
              subheader={
                !isPlaceholderData ? (
                  <>
                    <div>{getFormattedDate(theme.updated_at)}</div>
                    <RelSummary relArray={theme.related} type="related" />
                    <RelSummary relArray={theme.recurrent} type="recurrent" />
                    <RelSummary relArray={theme.sporadic} type="sporadic" />
                  </>
                ) : (
                  <Skeleton animation="wave" variant="text" width={200}></Skeleton>
                )
              }
              avatar={
                !isPlaceholderData ? (
                  <IconButton title={theme.source + ' theme'}>
                    <FontAwesomeIcon icon={iconThemeTypeMap[theme.source]} />
                  </IconButton>
                ) : (
                  <Skeleton animation="wave" variant="circular" width={32} height={32}></Skeleton>
                )
              }
            >
              <RelSummary relArray={theme.related} type="related" />
            </CardHeader>
            <CardContent>
              <Typography variant="body1" align="left">
                {!isPlaceholderData ? theme.summary : <Skeleton animation="wave" variant="text" />}
              </Typography>
              <Box mt={1}>
                {recurrentText}
                {sporadicText}
              </Box>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Grid>
        <Grid item={true} xs={12}>
          <Card>
            <CardContent>
              <ArticleGroup
                articles={theme.related}
                title={'Related Articles'}
                isPlaceholderData={isPlaceholderData}
              ></ArticleGroup>
            </CardContent>
          </Card>
        </Grid>
        <Grid item={true} xs={12}>
          <Card>
            <CardContent>
              <Chatbot context={theme.related}></Chatbot>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  ) : (
    <></>
  );
}
