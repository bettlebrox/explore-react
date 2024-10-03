import { DassieItem } from './Theme';

export interface Article extends DassieItem {
  score?: number;
  themes: DassieItem[];
  logged_at: string;
  text: string;
  url: string;
  image: string | null;
}
