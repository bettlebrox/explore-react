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
import { useEffect, useState } from 'react';

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <Header loginId={user?.signInDetails?.loginId ?? ''} onSignOut={signOut} />
          <Paper sx={{ p: 2, margin: 'auto', width: width > 1200 ? '1200px' : '100%' }}>
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
