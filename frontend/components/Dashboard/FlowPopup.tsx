import { useAuth } from '@/context/AuthContext';
import { Image, Text, View } from 'react-native';
export default function FlowPopup() {
    const {scaleFont} = useAuth();
    return (
        <>
            <View style={{
                marginTop: scaleFont(26),
                alignItems: 'center',
                flexDirection: 'row',
                gap: scaleFont(15),
            }}>
                <View style={{
                    flexDirection: "column",
                    gap: scaleFont(8),
                    borderRadius: scaleFont(15),
                    borderWidth: scaleFont(1),
                    borderColor: "#F8F8F8",
                    paddingHorizontal: scaleFont(8),
                    paddingVertical: scaleFont(11),
                    height:scaleFont(86),
                    backgroundColor:"#FFFFFF"
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
                            maxWidth: scaleFont(85),
                        }}>
                            Emotional Intelligence
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
                            width: scaleFont(141),
                            borderWidth: scaleFont(4),
                            borderColor: "#F8F8F8",
                            borderRadius: scaleFont(15),
                            marginTop: scaleFont(6)
                        }}>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: "column",
                    flex:1,
                    gap: scaleFont(8),
                    borderRadius: scaleFont(15),
                    borderWidth: scaleFont(1),
                    borderColor: "#F8F8F8",
                    paddingHorizontal: scaleFont(8),
                    paddingVertical: scaleFont(11),
                    backgroundColor:"#FFFFFF",
                    height:scaleFont(86),
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: scaleFont(4),


                    }}>
                        <Image
                            style={{ width: scaleFont(24), height: scaleFont(24) }}
                            source={require('@/assets/images/dashboard/dialogue.png')}
                        />
                        <Text style={{
                            fontFamily: "SFPro",
                            fontWeight: "900",
                            fontSize: scaleFont(12),
                            color: "#181818",
                        }}>
                            Dialogue Flow
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
                            width: scaleFont(141),
                            borderWidth: scaleFont(4),
                            borderColor: "#F8F8F8",
                            borderRadius: scaleFont(15),
                            marginTop: scaleFont(6)
                        }}>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}