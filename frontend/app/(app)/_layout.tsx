import { useAuth } from '@/context/AuthContext';
import { SocketProvider } from '@/context/SocketContext';
import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
export default function AppLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true)
  }, []);
  useEffect(() => {
    console.log(user)
    if (isMount) {
      if (!user) {
        // If not logged in, redirect to login page in (auth)
        router.replace('/signup');
      }
    }
  }, [user, isMount]);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Redirecting to login...</Text>
      </View>
    );
  }

  return (
    <SocketProvider>
        <Slot />
    </SocketProvider>
  );
}
