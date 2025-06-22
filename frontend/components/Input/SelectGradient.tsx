import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, View, ViewStyle } from "react-native";

export default function ({ children, showGradient = true,style }: { children: React.ReactNode, showGradient?: boolean,style?: StyleProp<ViewStyle> }) {
    const { scaleFont } = useAuth();
    return (
        <>
            {
                showGradient ? (
                    <LinearGradient
                        colors={['#EBD2FE', '#FBB9DD']}
                        start={{ x: 0.2, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={
                            {
                                borderRadius: scaleFont(12),
                                padding: scaleFont(1),
                                ...style as any
                            }
                        }
                    >
                        {children}
                    </LinearGradient>
                ) : (
                    <View style={style}>
                        {children}
                    </View>
                )
            }
        </>
    )
}