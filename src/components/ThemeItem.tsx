import { Theme } from "../interfaces/Theme";
import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFormattedDate } from "../utils/format";
import { iconThemeTypeMap } from "../utils/map";
import { Link } from "react-router-dom";
import { del } from "aws-amplify/api";
import { useMutation } from "react-query";
import { queryClient } from "../main";

async function delTheme(title:string){
  try {
    const restOperation = del({
      apiName: "Dassie",
      path: "/api/themes/" +title,
    });
    await restOperation.response;
    console.log("DELETE call succeeded");
  }catch (error) {
    console.log("DELETE call failed: ");
  }
}
export function ThemeItem({
  theme,
  expanded,
  isPlaceholderData: isPlaceholderData
}: {
  theme: Theme;
  expanded?: boolean;
  isPlaceholderData?: boolean;
}) {
  const deleteTheme = useMutation({
    mutationFn: async (title: string) => {
      await delTheme(title);
      return title;
    },
    onMutate: () => {
      queryClient.cancelQueries(["customThemesData"]);
    }
  });
  const actions = <CardActions><IconButton onClick={() => deleteTheme.mutate(theme.title)}>Delete</IconButton></CardActions>;
  let subheader = <></>;
  let avatar: JSX.Element | null = null;
  if (expanded) {
    avatar =
      isPlaceholderData ? (
        <IconButton>
          <Skeleton animation="wave" variant="circular" width={32} height={32} />
        </IconButton>
      ) : (
        <IconButton>
          <FontAwesomeIcon icon={iconThemeTypeMap[theme.source]} />
        </IconButton>
      );
    subheader = (
      isPlaceholderData ? (
        <>
          <Typography variant="body2" align="left">
            <Skeleton animation="wave" variant="text" width={200} />
          </Typography>
          <Typography variant="body2" align="left">
            <Skeleton animation="wave" variant="text" width={200} />
          </Typography>
        </>
      ):(
        <>
        <Typography variant="body2" align="left">
          {getFormattedDate(theme.created_at)}
        </Typography>
        <Typography variant="body2" align="left">
          {theme.summary}
        </Typography>
      </>
      )
    );
  }
  return (
    <Card className="theme-item" variant="outlined" sx={{ minWidth: 520 }}>
      <CardActionArea component={Link} to={"/theme/" + theme.title}>
        <CardHeader
          title={isPlaceholderData?(<Skeleton animation="wave" variant="text" width={200} />):(<Typography>{theme.original_title}</Typography>)}
          align="left"
          subheader={subheader}
          avatar={avatar}
        />
      </CardActionArea>
        {actions}
    </Card>
  );
}
