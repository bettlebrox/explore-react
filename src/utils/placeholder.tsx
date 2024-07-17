import { Article } from "../interfaces/Article";
import { ThemeDetail } from "../interfaces/ThemeDetail";

export function getPlaceHolderArticles(): Article[] {
  return new Array<Article>(3)
    .fill({
      id: "1",
      source: "skeleton",
      title: "",
      original_title: "",
      summary: null,
      created_at: "",
      updated_at: "",
      url: "",
      image: null,
      text: "",
    })
    .map((article, index) => ({ ...article, id: index.toString() }));
}
export function getPlaceHolderTheme(): ThemeDetail {
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
        text: "",
        image: null,
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
