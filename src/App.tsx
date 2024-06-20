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

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient()
function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <QueryClientProvider client={queryClient}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dassie - {user?.signInDetails?.loginId}'s Second Brain
                  </Typography>
                  <Button color="inherit" onClick={signOut}>
                    Logout
                  </Button>
                </Toolbar>
              </AppBar>
            </Box>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/theme/:themeTitle" element={<ThemeDetail />} />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </>
      )}
    </Authenticator>
  );
}

export default App;
