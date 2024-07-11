import { useMemo } from "react";
import { Theme } from "../interfaces/Theme";
import { Grid } from "@mui/material";
import { ThemeGroup } from "./ThemeList";
import { useQuery } from "react-query";
import { get } from "aws-amplify/api";
import { ThemeForm } from "./ThemeForm";



const getRecentThemes = async () => {
  const { body } = await get({
    apiName: "Dassie",
    path: "/api/themes",
    options: {
      queryParams: {
        sortField: "updated_at",
        max: "3",
      },
    },
  }).response;
  return JSON.parse(await body.text()) as Theme[];
};

const getTopThemes = async () => {
  const { body } = await get({
    apiName: "Dassie",
    path: "/api/themes",
    options: {
      queryParams: {
        sortField: "count_association",
        max: "3",
      },
    },
  }).response;
  return JSON.parse(await body.text()) as Theme[];
};

const getCustomThemes = async () => {
  const { body } = await get({
    apiName: "Dassie",
    path: "/api/themes",
    options: {
      queryParams: {
        sortField: "count_association",
        source: "custom",
        max: "3",
      },
    },
  }).response;
  return JSON.parse(await body.text()) as Theme[];
};

function getPlaceHolderThemes(): Theme[] {
  return new Array<Theme>(3)
    .fill({
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
    })
    .map((theme, index) => ({ ...theme, id: index.toString() }));
}
export function Dashboard() {
  const placeholderThemes = useMemo(() => getPlaceHolderThemes(), []);
  const {
    data: recentThemes,
    error: recentThemesError,
    isPlaceholderData: recentThemesIsPlaceholderData,
  } = useQuery<Theme[]>("recentThemesData", getRecentThemes, {
    placeholderData: placeholderThemes,
  });
  const {
    data: topThemes,
    error: topThemesError,
    isPlaceholderData: topThemesIsPlaceholderData,
  } = useQuery<Theme[]>("topThemesData", getTopThemes, {
    placeholderData: placeholderThemes,
  });
  const {
    data: customThemes,
    error: customThemesError,
    isPlaceholderData: customThemesIsPlaceholderData,
  } = useQuery<Theme[]>("customThemesData", getCustomThemes, {
    placeholderData: placeholderThemes,
  });
  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={6}>
          <ThemeGroup
            title="Top Themes"
            themes={topThemes}
            status={{ error: topThemesError, isPlaceholderData: topThemesIsPlaceholderData }}
            expanded
          />
        </Grid>
        <Grid item={true} xs={6}>
          <ThemeGroup
            title="Recent Themes"
            themes={recentThemes}
            status={{ error: recentThemesError, isPlaceholderData: recentThemesIsPlaceholderData }}
            expanded
          />
        </Grid>
        <Grid item={true} xs={6}>
          <ThemeGroup
            title="Custom Themes"
            themes={customThemes}
            status={{ error: customThemesError, isPlaceholderData: customThemesIsPlaceholderData }}
            expanded
          />
        </Grid>
        <Grid item={true} xs={6}>
          <ThemeForm/>
        </Grid>
      </Grid>
    </>
  );
}
