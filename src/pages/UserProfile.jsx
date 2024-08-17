import React from 'react';
import { useQuery, getUser } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const UserProfilePage = () => {
  const { data: user, isLoading, error } = useQuery(getUser, { id: userId });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default UserProfilePage;