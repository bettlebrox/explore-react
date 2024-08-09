import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeDetails } from './components/ThemeDetails';
import { Dashboard } from './components/Dashboard';
import { Authenticator } from '@aws-amplify/ui-react';
import { Header } from './components/Header';
import '@aws-amplify/ui-react/styles.css';
import { Paper } from '@mui/material';
import { Articles } from './components/Articles';
import { Profile } from './components/Profile';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <Header loginId={user?.signInDetails?.loginId ?? ''} onSignOut={signOut} />
          <Paper sx={{ p: 2, maxWidth: 1200, margin: 'auto' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/theme/:themeTitle" element={<ThemeDetails />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Paper>
        </>
      )}
    </Authenticator>
  );
}

export default App;
