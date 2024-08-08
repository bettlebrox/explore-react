import { getCurrentUser } from 'aws-amplify/auth';
import { useState } from 'react';
export function Profile() {
  const [username, setUsername] = useState<string>('loading...');
  async function updateUsername() {
    const user = await getCurrentUser();
    setUsername(user?.username);
  }
  updateUsername();
  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {username}</p>
    </div>
  );
}
