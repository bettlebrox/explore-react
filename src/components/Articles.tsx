import { get } from "aws-amplify/api";
import { ArticleGroup } from "./ArticleList";
import { Article } from "../interfaces/Article";
import { getPlaceHolderArticles } from "../utils/placeholder";
import { useQuery } from "react-query";

const getArticles = async ({ queryParams }: { queryParams: Record<string, string> }) => {
  queryParams["sortField"] = queryParams["sortField"] || "updated_date";
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
  const params = {
    sortField: "updated_at",
    max: "30",
  };
  const placeholderArticles = getPlaceHolderArticles();
  const { data: articles, isPlaceholderData: isPlaceholderData } = useQuery<Article[]>(
    ["articles", params],
    () => getArticles({ queryParams: params }),
    {
      placeholderData: placeholderArticles,
    }
  );
  return (
    <ArticleGroup
      articles={articles}
      title={"All Articles"}
      isPlaceholderData={isPlaceholderData}
      detailed={true}
    ></ArticleGroup>
  );
}
