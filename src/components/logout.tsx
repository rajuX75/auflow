'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

const Logout = () => {
  const handleClick = async () => {
    await authClient.signOut();
    window.location.href = '/login';
  };
  return <Button onClick={handleClick}>Logout</Button>;
};

export default Logout;
