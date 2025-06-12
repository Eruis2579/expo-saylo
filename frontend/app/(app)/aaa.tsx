import { useAuth } from '@/context/AuthContext';
import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

function AppLayout() {
    const { user } = useAuth();
    const router = useRouter();
    const [isMount, setIsMount] = useState(false);
    useEffect(() => {
        setIsMount(true)
    }, []);
    useEffect(() => {
        if (isMount) {
            if (!user) {
                // If not logged in, redirect to login page in (auth)
                // router.replace('/login');
            }
        }
    }, [user, isMount]);

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Redirecting to login...</Text>
                <button onClick={() => {
                    router.replace('/');
                }} >w</button>
            </View>
        );
    }

    return <Slot />;
}
export default AppLayout;