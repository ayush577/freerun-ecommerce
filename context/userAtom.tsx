'use client';
import { atomWithStorage } from 'jotai/utils';
import { useAtom } from 'jotai';

const LOCAL_STORAGE_KEY = 'token';

// Create an atom with localStorage synchronization using atomWithStorage
export const userAtom = atomWithStorage<string>(LOCAL_STORAGE_KEY, '');

// Custom hook for managing user token
export const useUser = () => {
  const [userToken, setUserToken] = useAtom(userAtom);

  const setToken = (token: string) => {
    setUserToken(token);
  };

  const removeToken = () => {
    setToken('');
  };

  const isLoggedIn = () => {
    return Boolean(userToken);
  };

  return {
    setToken,
    removeToken,
    isLoggedIn,
  };
};
