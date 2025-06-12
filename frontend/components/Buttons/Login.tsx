import { Pressable, Text, View } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import { useAuth } from "../../context/AuthContext";

export function LoginButton({ title, onchange }: { title: string, onchange?: () => void }) {
    const { scaleFont } = useAuth();
    return (
        <Pressable onPress={onchange}>
            <Shadow distance={5} startColor="#FBB9DD26" offset={[0, 4]} containerStyle={{ borderRadius: 10 }}>
                <View
                    style={{
                        borderRadius: scaleFont(10),
                        paddingHorizontal: scaleFont(10),
                        paddingVertical: scaleFont(8),
                        backgroundColor: '#FFFFFF4A',
                        borderWidth: 1,
                        borderColor: '#F8F8F8',
                        cursor: 'pointer'
                    }}>
                    <Text style={{
                        fontFamily: 'SFPro',
                        fontSize: scaleFont(16),
                        fontWeight: 'bold',
                        color: '#9747FF',
                        lineHeight: scaleFont(25.6),
                    }}>{title}</Text>
                </View>
            </Shadow>
        </Pressable>
    );
}
