import { useAuth } from '@/context/AuthContext';
import { SocketProvider } from '@/context/SocketContext';
import * as Linking from 'expo-linking';
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
        router.replace('/splash');
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
  useEffect(() => {
    const subscription = Linking.addEventListener('url', (event) => {
      const url = event.url;
      const parsed = Linking.parse(url);

      // parsed.queryParams.code contains the code!
      const code = parsed.queryParams?.code;
      if (typeof code === "string" && code.length > 0) {
        router.replace(`/pairingWithCode?code=${code}`);
      }
    });

    // Clean up
    return () => subscription.remove();
  }, []);
  return (
    <SocketProvider>
      <Slot />
    </SocketProvider>
  );
}
