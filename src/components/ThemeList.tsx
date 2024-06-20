import { Typography } from "@mui/material";
import { DassieItem } from "../interfaces/Theme";
import { ThemeItem } from "./ThemeItem";

export function ThemeList({
  themes,
  status,
  expanded,
}: {
  themes: DassieItem[];
  status: {error: unknown; isLoading: unknown};
  expanded?: boolean;
}) {
  if (status.isLoading) return <Typography align="left">Loading...</Typography>;
  if(status.error) return <Typography align="left">Error</Typography>;
  return (
    <>
      {themes.map((theme) => {
        return <ThemeItem key={theme.id} theme={theme} expanded={expanded} />;
      })}
    </>
  );
}
export function ThemeGroup({ title, themes,status, expanded }: { title: string; themes: DassieItem[], status:{error:unknown;isLoading:unknown}, expanded?: boolean }) {
    return (
      <>
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        <ThemeList themes={themes} expanded={expanded} status={status} />
      </>
    );
  }