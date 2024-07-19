import { Article } from './Article';
import { Theme } from './Theme';

export interface ThemeDetail extends Theme {
  related: Article[];
  recurrent: Theme[];
  sporadic: Theme[];
}
