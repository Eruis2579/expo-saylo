import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { useAuth } from "../../context/AuthContext";
export function Bar({ current = 0 }: { current: number }) {
    const { scaleFont } = useAuth();
    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scaleFont(8),
            }}>
                {Array(3).fill(0).map((v, k) => (
                    k === current ? <LinearGradient
                        key={k}
                        colors={["#EBD2FE", "#FBB9DD"]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={{
                            borderRadius: scaleFont(5),
                            paddingTop: scaleFont(3.5),
                            paddingBottom: scaleFont(3.5),
                        }}
                    >
                        <View
                            style={{
                                width: scaleFont(43),
                            }}
                        />
                    </LinearGradient> : <View key={k} style={{
                        width: scaleFont(24),
                        paddingTop: scaleFont(3.5),
                        paddingBottom: scaleFont(3.5),
                        backgroundColor: '#FFFFFF',
                        borderRadius: scaleFont(5),
                    }}>
                    </View>
                ))}
            </View>
        </>
    );
}