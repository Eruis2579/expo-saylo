import { useAuth } from "@/context/AuthContext";
import { Image, Text, View } from "react-native";
export default function Overall() {
    const { scaleFont,user } = useAuth();
    return (
        <>
            <View style={{
                paddingHorizontal: scaleFont(8),
                paddingVertical: scaleFont(16),
                marginTop: scaleFont(18),
                borderWidth: scaleFont(1),
                borderColor: "#F8F8F8",
                flexDirection: "column",
                borderRadius: scaleFont(25),
                minHeight:scaleFont(171),
                alignItems:"center"
            }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                    }}>
                        <Image
                            source={require('@/assets/images/dashboard/overall.png')}
                            style={{
                                width: scaleFont(32),
                                height: scaleFont(32),
                            }}
                        />
                        <Text style={{
                            fontFamily: 'SFPro',
                            fontWeight: '800',
                            fontSize: scaleFont(14),
                            color: '#181818',
                            lineHeight: scaleFont(16.8),
                            maxWidth:scaleFont(270),
                        }}>
                            Shared values and weekly intentions with {user?.friend?.realname || "Sarah"}
                        </Text>

                    </View>
                    <Text style={{
                        fontFamily: 'SFProMedium',
                        fontSize: scaleFont(12),
                        color: '#5F5F5F',
                        lineHeight: scaleFont(14.4),
                        marginTop: scaleFont(16),
                        maxWidth:scaleFont(233),
                        textAlign:"center"
                    }}>
                        No shared values and weekly intentions with {user?.friend?.realname || "Sarah"}
                    </Text>
                </View>
        </>
    )
}