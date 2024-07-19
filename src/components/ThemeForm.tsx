import { LinearProgress, TextField } from '@mui/material';
import React from 'react';
import { UseMutationResult } from 'react-query';

export function ThemeForm({ onAddTheme }: { onAddTheme: UseMutationResult<unknown, unknown, string, unknown> }) {
  const [title, setTitle] = React.useState('');
  const [waiting, setWaiting] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWaiting(true);
    onAddTheme.mutate(title, {
      onSuccess: () => {
        setTitle('');
        setWaiting(false);
      },
      onError: () => {
        setWaiting(false);
      },
    });
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
