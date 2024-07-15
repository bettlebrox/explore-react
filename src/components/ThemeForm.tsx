import { LinearProgress, TextField } from "@mui/material";
import { post } from "aws-amplify/api";
import React from "react";

async function postItem(title: string, handleSubmitComplete: () => void) {
  try {
    const restOperation = post({
      apiName: "Dassie",
      path: "/api/themes",
      options: {
        body: {
          title: title,
        },
      },
    });

    const { body } = await restOperation.response;
    const response = await body.json();
    handleSubmitComplete();
    console.log("POST call succeeded");
    console.log(response);
  } catch (error) {
    console.log("POST call failed: ");
    handleSubmitComplete();
  }
}

export function ThemeForm() {
  const [title, setTitle] = React.useState("");
  const [waiting, setWaiting] = React.useState(false);
  const handleSubmitComplete = () => {
    setWaiting(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWaiting(true);
    postItem(title, handleSubmitComplete);
  };
  const waitingElement = waiting ? <LinearProgress /> : <></>;
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        id="outlined-basic"
        label="Add a new theme"
        variant="outlined"
        value={title}
        disabled={waiting}
        onChange={(e) => setTitle(e.target.value)}
      />
      {waitingElement}
    </form>
  );
}
