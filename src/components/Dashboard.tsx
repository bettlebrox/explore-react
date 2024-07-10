import { useMemo, useState } from "react";
import { Theme } from "../interfaces/Theme";
import { Grid } from "@mui/material";
import { ThemeGroup } from "./ThemeList";
import { useQuery } from "react-query";
import { get } from "aws-amplify/api";

const getRecentThemes = async () => {
  /*const response = await axios.get(
    "http://127.0.0.1:3000/api/themes?sortField=updated_at&max=5",
  );
  return response.data;*/
    const {body} = await get({
      apiName: "Dassie",
      path: "/api/themes",
      options: {
        queryParams: {
          sortField: "updated_at",
          max: "5",
        },
      },
    }).response;
    return body.json()
};

function getPlaceHolderThemes(){
  return new Array<Theme>(3).fill({
    id: "1", source: "skeleton",
    recurrent_count: 0,
    sporadic_count: 0,
    article_count: 0,
    title: "",
    original_title: "",
    summary: null,
    created_at: "",
    updated_at: ""
  }).map((theme, index) => ({...theme, id: index.toString()}));
}
export function Dashboard() {
  const placeholderThemes = useMemo(() => getPlaceHolderThemes(), []);
  const {
    data: recentThemes,
    error: error,
    isPlaceholderData:isPlaceholderData,
  } = useQuery("themesData", getRecentThemes,{placeholderData:placeholderThemes});
  const [topThemes] = useState<Theme[]>([
    {
      id: "fddfc95b-a847-4a70-9f4c-903f0fe5ca03",
      title: "consumer+information",
      original_title: "Consumer Information",
      summary: null,
      created_at: "2024-06-06T15:43:48.725583",
      updated_at: "2024-06-17T14:21:22.330241",
      source: "top",
      recurrent_count: 0,
      sporadic_count: 0,
      article_count: 0
    },
    {
      id: "710b2049-ad7e-42fc-bb2d-3a818a6c1a59",
      title: "digital+sales+room",
      original_title: "Digital Sales Room",
      summary: "SalesAI offers a foundational platform for leveraging AI in sales, providing accurate insights, holistic views, and a clear path to revenue growth.",
      created_at: "2024-06-17T14:21:22.330206",
      updated_at: "2024-06-17T14:21:22.330241",
      source: "article",
      recurrent_count: 0,
      sporadic_count: 0,
      article_count: 0
    },
    {
      id: "fe4c4e35-b445-4e57-a9e2-6625d640b68e",
      title: "open+source+projects+and+licensing",
      original_title: "Open Source Projects And Licensing",
      summary: "Licensing and starting open source projects are common themes in the provided texts.",
      created_at: "2024-06-17T14:21:22.330206",
      updated_at: "2024-06-17T14:21:22.330241",
      source: "custom",
      recurrent_count: 0,
      sporadic_count: 0,
      article_count: 0
    },
  ]);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={6}>
          <ThemeGroup
            title="Top Themes"
            themes={topThemes}
            status={{ error: error, isPlaceholderData: isPlaceholderData }}
            expanded
          />
        </Grid>
        <Grid item={true} xs={6}>
          <ThemeGroup
            title="Recent Themes"
            themes={recentThemes}
            status={{ error: error, isPlaceholderData: isPlaceholderData }}
            expanded
          />
        </Grid>
      </Grid>
    </>
  );
}
