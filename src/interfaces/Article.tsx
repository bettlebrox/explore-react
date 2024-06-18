import { DassieItem } from "./Theme";

export interface Article extends DassieItem{
    text: string,
    url: string,
    image: string | null
}