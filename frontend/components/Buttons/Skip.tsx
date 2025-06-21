import { Pressable, Text, View } from "react-native";
import { Shadow } from 'react-native-shadow-2';
import { useAuth } from "../../context/AuthContext";
export function SkipButton({ onchange }: { onchange?: () => void }) {
    const { scaleFont } = useAuth();
    return (
        <Pressable onPress={onchange}>
            <Shadow distance={5} startColor="#FBB9DD26" offset={[0, 4]} containerStyle={{ borderRadius: 10 }}>
                <View
                    style={{
                        backgroundColor: "#FFFFFF4A",
                        borderRadius: scaleFont(10),
                        borderWidth: 1,
                        borderColor: "#F8F8F8",
                        cursor: "pointer",
                        paddingHorizontal: scaleFont(10),
                        paddingVertical: scaleFont(8),
                    }}>
                    <Text style={{
                        fontFamily: 'SFProSemiBold',
                        fontSize: scaleFont(16),
                        color: '#9747FF',
                        lineHeight: scaleFont(25.6),
                    }}>Skip</Text>
                </View>
            </Shadow>
        </Pressable>
    );
}
