import { useAuth } from "@/context/AuthContext";
import { Image, Text, View } from "react-native";
export default function Emotion() {
    const { scaleFont } = useAuth();
    return (
        <>
        <View style={{
                        flexDirection: "column",
                        gap: scaleFont(8),
                        borderRadius: scaleFont(15),
                        borderWidth: scaleFont(1),
                        borderColor: "#F8F8F8",
                        paddingHorizontal: scaleFont(8),
                        paddingVertical: scaleFont(13),
                        marginTop: scaleFont(10),
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: scaleFont(4),
                        }}>
                            <Image
                                style={{ width: scaleFont(24), height: scaleFont(19.5) }}
                                source={require('@/assets/images/dashboard/emotion.png')}
                            />
                            <Text style={{
                                fontFamily: "SFPro",
                                fontWeight: "900",
                                fontSize: scaleFont(12),
                                color: "#181818",
                            }}>
                                Emothional Intelligence
                            </Text>
                        </View>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            }}>
                                <Text style={{

                                    fontFamily: "SFProMedium",
                                    fontSize: scaleFont(10),
                                    color: '#5F5F5F',
                                    lineHeight: scaleFont(12),
                                }}>
                                    0%
                                </Text>
                            </View>
                            <View style={{
                                width: scaleFont(323),
                                borderWidth: scaleFont(4),
                                borderColor: "#F8F8F8",
                                borderRadius: scaleFont(20),
                                marginTop: scaleFont(6)
                            }}>
                            </View>
                        </View>
                    </View>
        </>
    )
}