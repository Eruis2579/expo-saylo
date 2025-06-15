import OverallIcon from '@/assets/images/dashboard/overall.svg';
import { useAuth } from "@/context/AuthContext";
import { Text, View } from "react-native";
export default function Overall() {
    const { scaleFont } = useAuth();
    return (
        <>
            <View style={{
                paddingHorizontal: scaleFont(8),
                paddingVertical: scaleFont(10),
                marginTop: scaleFont(18),
                borderWidth: scaleFont(1),
                borderColor: "#F8F8F8",
                borderRadius: scaleFont(25)
            }}>
                <View
                    style={{
                        backgroundColor: "#F9F1FE",
                        borderRadius: scaleFont(20),
                        borderWidth: scaleFont(1),
                        borderColor: '#F8F8F8',
                        paddingHorizontal: scaleFont(16),
                        paddingVertical: scaleFont(12),
                        flexDirection: "column",
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        gap: scaleFont(8),
                    }}>
                        <OverallIcon width={scaleFont(32)}
                            height={scaleFont(32)} />
                        <Text style={{
                            fontFamily: 'SFPro',
                            fontWeight: '800',
                            fontSize: scaleFont(14),
                            color: '#181818',
                            lineHeight: scaleFont(16.8),
                        }}>
                            Overall Progress
                        </Text>

                    </View>
                    <Text style={{
                        fontFamily: 'SFProMedium',
                        fontSize: scaleFont(12),
                        color: '#5F5F5F',
                        lineHeight: scaleFont(14.4),
                        marginTop: scaleFont(8)
                    }}>
                        Good Job! You become closer to your partner
                    </Text>
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
                            width: scaleFont(291),
                            borderWidth: scaleFont(4),
                            borderColor: "#FFFFFF66",
                            borderRadius: scaleFont(20),
                            marginTop: scaleFont(6)
                        }}>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}