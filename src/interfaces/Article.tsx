import { DassieItem } from './Theme';

export interface Article extends DassieItem {
  themes: DassieItem[];
  logged_at: string;
  text: string;
  url: string;
  image: string | null;
}
