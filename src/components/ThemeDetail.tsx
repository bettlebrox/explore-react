import { DassieItem, Theme } from "../interfaces/Theme";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { getFormattedDate } from "../utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconThemeTypeMap } from "../utils/map";
import { RelSummary } from "./RelSummary";
import { ArticleGroup } from "./ArticleList";
import { Chatbot } from "./Chatbot";
import { get } from "aws-amplify/api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { ThemeLinkList } from "./ThemeLinkList";
import { useMemo } from "react";

interface ThemeDetail extends Theme {
  related: Article[];
  recurrent: Theme[];
  sporadic: Theme[];
}
interface Article extends DassieItem {
  url: string;
  logged_at: string;
  text: string;
  image: string | null;
  themes: string[];
}
function getPlaceHolderTheme(): ThemeDetail {
  return {
    id: "1",
    source: "skeleton",
    recurrent_count: 0,
    sporadic_count: 0,
    article_count: 0,
    title: "",
    original_title: "",
    summary: null,
    created_at: "",
    updated_at: "",
    related: [
      {
        url: "",
        logged_at: "",
        text: "",
        image: null,
        themes: [],
        id: "",
        title: "",
        original_title: "",
        summary: null,
        created_at: "",
        updated_at: "",
        source: "skeleton",
      },
    ],
    recurrent: [],
    sporadic: [],
  };
}

export function ThemeDetail() {
  const placeholderTheme = useMemo(() => getPlaceHolderTheme(), []);
  const { pathname } = useLocation();
  const getTheme = async () => {
    const { body } = await get({
      apiName: "Dassie",
      path: "/api/themes/" + pathname.split("/").pop(),
    }).response;
    return JSON.parse(await body.text()) as ThemeDetail;
  };
  const { data: theme, error: error, isPlaceholderData: isPlaceholderData } = useQuery<ThemeDetail>(
    "themeData",
    getTheme,
    { placeholderData: placeholderTheme }
  );
  if (error) {
    console.log(error);
  }
  let recurrentText = <></>;
  if (!isPlaceholderData && theme && theme.recurrent.length > 0) {
    recurrentText = (
      <Typography align="left">
        <ThemeLinkList themes={theme.recurrent} /> also frequently appear in
        these articles.
      </Typography>
    );
  }
  let sporadicText = <></>;
  if (!isPlaceholderData && theme && theme.sporadic.length > 0) {
    sporadicText = (
      <Typography align="left">
        <ThemeLinkList themes={theme.sporadic} /> appears sporadically in some
        of these articles.
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
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={200}
                  ></Skeleton>
                )
              }
              align="left"
              subheader={
                !isPlaceholderData ? (
                  <>
                    <div>{getFormattedDate(theme.updated_at)}</div>
                    <RelSummary count={theme.related.length} type="related" />
                    <RelSummary
                      count={theme.recurrent.length}
                      type="recurrent"
                    />
                    <RelSummary count={theme.sporadic.length} type="sporadic" />
                  </>
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={200}
                  ></Skeleton>
                )
              }
              avatar={
                !isPlaceholderData ? (
                  <IconButton>
                    <FontAwesomeIcon icon={iconThemeTypeMap[theme.source]} />
                  </IconButton>
                ) : (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={32}
                    height={32}
                  ></Skeleton>
                )
              }
            >
              <RelSummary count={theme.related.length} type="related" />
            </CardHeader>
            <CardContent>
              <Typography variant="body1" align="left">
                {!isPlaceholderData ? (
                  theme.summary
                ) : (
                  <Skeleton animation="wave" variant="text" />
                )}
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
                title={"Related Articles"}
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
