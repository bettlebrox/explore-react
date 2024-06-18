import { Typography } from "@mui/material";
import { DassieItem } from "../interfaces/Theme";
import { ThemeItem } from "./ThemeItem";

export function ThemeList({ themes, expanded }: { themes: DassieItem[], expanded?:boolean }) {
    return (
      <>
        {themes.map((theme) => {
          return <ThemeItem key={theme.id} theme={theme} expanded={expanded} />;
        })}
      </>
    );
  }
export function ThemeGroup({ title, themes, expanded }: { title: string; themes: DassieItem[], expanded?: boolean }) {
    return (
      <>
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        <ThemeList themes={themes} expanded={expanded}/>
      </>
    );
  }