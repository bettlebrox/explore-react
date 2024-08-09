import { useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { fetchUserAttributes } from 'aws-amplify/auth';
export function Header({ loginId, onSignOut }: { loginId: string; onSignOut?: (() => void) | undefined }) {
  const [givenName, setGivenName] = useState<string>('loading...');
  async function fetchGivenName(loginId: string) {
    const atts = await fetchUserAttributes();
    setGivenName(atts.given_name ?? loginId);
  }
  fetchGivenName(loginId);
  return (
    <AppBar position="static" sx={{ minWidth: '100%' }}>
      <Toolbar>
        <Button color="inherit" href="/">
          Home
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dassie - {givenName}'s Second Brain
        </Typography>
        <Button color="inherit" onClick={onSignOut}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
