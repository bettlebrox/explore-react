import { Typography } from "@mui/material";
import { Theme } from "../interfaces/Theme";
import { ThemeItem } from "./ThemeItem";

export function ThemeList({
  themes,
  status,
  expanded,
}: {
  themes: Theme[] | undefined;
  status: {error: unknown; isPlaceholderData: boolean};
  expanded?: boolean;
}) {
  if(status.error || !themes) return <Typography align="left">Error</Typography>;
  return (
    <>
      {themes.map((theme) => {
        return <ThemeItem key={theme.id} theme={theme} expanded={expanded} isPlaceholderData={status.isPlaceholderData} />;
      })}
    </>
  );
}
export function ThemeGroup({ title, themes,status, expanded }: { title: string; themes: Theme[] | undefined, status:{error:unknown;isPlaceholderData:boolean}, expanded?: boolean }) {
    return (
      <>
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        <ThemeList themes={themes} expanded={expanded} status={status} />
      </>
    );
  }