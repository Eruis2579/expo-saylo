import { useAuth } from '@/context/AuthContext';
import { Text } from 'react-native';
function AppLayout() {
    const { user } = useAuth();
    return <>
        <Text>{user?.name}</Text>
    </>
}
export default AppLayout;