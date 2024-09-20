import { Article } from './Article';
import { Theme } from './Theme';

export interface SearchResult {
  themes: Theme[];
  articles: Article[];
}
