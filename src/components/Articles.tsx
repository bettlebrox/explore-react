import { get } from "aws-amplify/api";
import { ArticleGroup } from "./ArticleList";
import { Article } from "../interfaces/Article";
import { getPlaceHolderArticles } from "../utils/placeholder";
import { setLogger, useQuery } from "react-query";
import { Grid, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

const getArticles = async ({ queryParams }: { queryParams: Record<string, string> }) => {
  queryParams["sortField"] = queryParams["sortField"] || "logged_at";
  queryParams["max"] = queryParams["max"] || "30";
  const { body } = await get({
    apiName: "Dassie",
    path: "/api/articles",
    options: {
      queryParams: queryParams,
    },
  }).response;
  return JSON.parse(await body.text()) as Article[];
};
export function Articles() {
  const [sortField, setSortField] = React.useState("logged_at");
  const [sortOrder, setSortOrder] = React.useState("desc");
  const [filter, setFilter] = React.useState("");
  const params = {
    sortField: sortField,
    max: "30",
    sortOrder: sortOrder,
    filter: filter,
  };
  const placeholderArticles = getPlaceHolderArticles();
  const {
    data: articles,
    isPlaceholderData: isPlaceholderData,
    isLoading: isLoading,
  } = useQuery<Article[]>(["articles", params], () => getArticles({ queryParams: params }), {
    placeholderData: placeholderArticles,
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //setWaiting(true);
    setFilter(event.currentTarget.filter.value);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <form onSubmit={handleSubmit}>
            <TextField id="filter" label="Filter" variant="outlined" />
          </form>
        </Grid>
        <Grid item xs={4}>
          <Select
            labelId="sort-field-label"
            id="sort-field"
            label="Sort By"
            defaultValue="logged_at"
            disabled={isLoading}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="logged_at">Logged At</MenuItem>
            <MenuItem value="created_at">Created At</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={2}>
          <ToggleButtonGroup
            exclusive
            value={sortOrder}
            disabled={isLoading}
            onChange={(_, value) => setSortOrder(value)}
          >
            <ToggleButton value={"desc"}>
              <FontAwesomeIcon icon={faSortAsc} />
            </ToggleButton>
            <ToggleButton value={"asc"}>
              <FontAwesomeIcon icon={faSortDesc} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <ArticleGroup
        articles={articles}
        title={"All Articles"}
        isPlaceholderData={isPlaceholderData}
        detailed={true}
      ></ArticleGroup>
    </>
  );
}
