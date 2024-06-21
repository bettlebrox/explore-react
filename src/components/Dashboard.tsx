import { useState } from "react";
import { DassieItem } from "../interfaces/Theme";
import { Grid } from "@mui/material";
import { ThemeGroup } from "./ThemeList";
import axios from "axios";
import { useQuery } from "react-query";
import { get } from "aws-amplify/api";
const getRecentThemes = async () => {
  /*const response = await axios.get(
    "http://127.0.0.1:3000/api/themes?sortField=updated_at&max=5",
  );
  return response.data;*/
  const response = await get({
    apiName: "Dassie",
    path: "/api/themes",
    options: {
      queryParams: {
        sortField: "updated_at",
        max: "5",
      },
    },
  });
  return response.json();
};
export function Dashboard() {
  /*const {
    data: recentThemes,
    error,
    isLoading,
  } = useQuery("themesData", getRecentThemes);*/
  const error = undefined;
   const isLoading = false;
    const [recentThemes] = useState<DassieItem[]>([
      {
        id: "a86b7d0b-e1af-4d0d-8231-e5ea4cb433c3",
        title: "download+and+sync+options",
        original_title: "Download And Sync Options",
        summary:
          "Download and sync options are available for various platforms and devices.",
        created_at: "2024-06-17T14:21:22.330206",
        updated_at: "2024-06-17T14:21:22.330241",
        source: "top",
      },
      {
        id: "34c7bf41-5f99-406a-8b6f-7b3a11a932ef",
        title: "software+engineering+director+roles",
        original_title: "Software Engineering Director Roles",
        summary:
          "Software engineering director roles in various companies require expertise in software development tools and team management.",
        created_at: "2024-06-17T14:21:22.330206",
        updated_at: "2024-06-17T14:21:22.330241",
        source: "top",
      },
      {
        id: "fddfc95b-a847-4a70-9f4c-903f0fe5ca03",
        title: "consumer+information",
        original_title: "Consumer Information",
        summary: null,
        created_at: "2024-06-06T15:43:48.725583",
        updated_at: "2024-06-17T14:21:22.330241",
        source: "top",
      },
    ]);
  const [topThemes] = useState<DassieItem[]>([
    {
      id: "fddfc95b-a847-4a70-9f4c-903f0fe5ca03",
      title: "consumer+information",
      original_title: "Consumer Information",
      summary: null,
      created_at: "2024-06-06T15:43:48.725583",
      updated_at: "2024-06-17T14:21:22.330241",
      source: "top",
    },
    {
      id: "710b2049-ad7e-42fc-bb2d-3a818a6c1a59",
      title: "digital+sales+room",
      original_title: "Digital Sales Room",
      summary:
        "SalesAI offers a foundational platform for leveraging AI in sales, providing accurate insights, holistic views, and a clear path to revenue growth.",
      created_at: "2024-06-17T14:21:22.330206",
      updated_at: "2024-06-17T14:21:22.330241",
      source: "article",
    },
    {
      id: "fe4c4e35-b445-4e57-a9e2-6625d640b68e",
      title: "open+source+projects+and+licensing",
      original_title: "Open Source Projects And Licensing",
      summary:
        "Licensing and starting open source projects are common themes in the provided texts.",
      created_at: "2024-06-17T14:21:22.330206",
      updated_at: "2024-06-17T14:21:22.330241",
      source: "custom",
    },
  ]);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item={true} xs={6}>
          <ThemeGroup
            title="Top Themes"
            themes={topThemes}
            status={{ error: error, isLoading: isLoading }}
            expanded
          />
        </Grid>
        <Grid item={true} xs={6}>
          <ThemeGroup
            title="Recent Themes"
            themes={recentThemes}
            status={{ error: error, isLoading: isLoading }}
            expanded
          />
        </Grid>
      </Grid>
    </>
  );
}
