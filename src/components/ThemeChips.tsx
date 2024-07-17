import { Chip } from "@mui/material";
import { DassieItem } from "../interfaces/Theme";
export default function ThemeChips({ themes }: { themes: DassieItem[] }) {
  const themesList = themes.map((theme) => <Chip key={theme.id} label={theme.original_title}></Chip>);
  return themes && themes.length > 0 ? themesList : <></>;
}
