import Link from "@mui/material/Link";
import { Theme } from "../interfaces/Theme";

export function ThemeLinkList({themes}:{themes:Theme[]}){
    return (
        themes.map((theme:Theme)=> (<span key={theme.id} ><Link color="inherit" href={theme.title}>{theme.original_title}</Link>{" "}</span>))
    )
}