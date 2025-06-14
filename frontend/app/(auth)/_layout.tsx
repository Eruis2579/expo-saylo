import { useAuth } from '@/context/AuthContext';
import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
export default function AuthLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true)
  }, []);
  useEffect(() => {
    console.log(user)
    if (isMount) {
      if (user) {
        // If not logged in, redirect to login page in (auth)
        router.replace('/partner');
      }
    }
  }, [user, isMount]);
  return (
    <>
      <Slot />
    </>
  );
}

