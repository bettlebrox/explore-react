import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeDetail } from "./components/ThemeDetail";
import { Dashboard } from "./components/Dashboard";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { AppBar, Button, Paper, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <AppBar position="static" sx={{ minWidth: "100%" }}>
            <Toolbar>
              <Button color="inherit" href="/">
                Home
              </Button>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Dassie - {user?.signInDetails?.loginId}'s Second Brain
              </Typography>
              <Button color="inherit" onClick={signOut}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
            <Paper sx={{ p: 2, maxWidth: 1200, margin: "auto" }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/theme/:themeTitle" element={<ThemeDetail />} />
              </Routes>
            </Paper>
        </>
      )}
    </Authenticator>
  );
}

export default App;
