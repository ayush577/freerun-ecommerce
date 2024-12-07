'use client';

import { useUser } from '@/context/userAtom';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();
  const { removeToken } = useUser();

  useEffect(() => {
    removeToken();
    router.push('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div>Logout</div>;
};

export default Logout;
