import { getCurrentUser } from 'aws-amplify/auth';
import { useState } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
export function Profile() {
  const [username, setUsername] = useState<string>('loading...');
  const [givenName, setGivenName] = useState<string>('loading...');
  async function fetchGivenName() {
    const atts = await fetchUserAttributes();
    setGivenName(atts.given_name ?? 'N/A');
  }
  async function updateUsername() {
    const user = await getCurrentUser();
    setUsername(user?.username);
  }
  updateUsername();
  fetchGivenName();
  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {username}</p>
      <p>Given Name: {givenName}</p>
    </div>
  );
}
