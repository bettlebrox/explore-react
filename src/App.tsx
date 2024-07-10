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
import { ReactQueryDevtools } from "react-query/devtools";

import { AppBar, Button, Paper, Toolbar, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <AppBar position="static">
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
          <QueryClientProvider client={queryClient}>
            <Paper sx={{ p: 2 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/theme/:themeTitle" element={<ThemeDetail />} />
              </Routes>
            </Paper>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </>
      )}
    </Authenticator>
  );
}

export default App;
