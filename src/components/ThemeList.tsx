import { Typography } from "@mui/material";
import { DassieItem } from "../interfaces/Theme";
import { ThemeItem } from "./ThemeItem";

export function ThemeList({
  themes,
  status,
  expanded,
}: {
  themes: DassieItem[];
  status: {error: unknown; isPlaceholderData: boolean};
  expanded?: boolean;
}) {
  if(status.error) return <Typography align="left">Error</Typography>;
  return (
    <>
      {themes.map((theme) => {
        return <ThemeItem key={theme.id} theme={theme} expanded={expanded} isPlaceholderData={status.isPlaceholderData} />;
      })}
    </>
  );
}
export function ThemeGroup({ title, themes,status, expanded }: { title: string; themes: DassieItem[], status:{error:unknown;isPlaceholderData:boolean}, expanded?: boolean }) {
    return (
      <>
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        <ThemeList themes={themes} expanded={expanded} status={status} />
      </>
    );
  }