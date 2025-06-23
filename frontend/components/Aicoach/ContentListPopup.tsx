import { useAuth } from "@/context/AuthContext";
import { Image, Text, View } from "react-native";
export default function ContentList({
    current,
    
}: {
    current: number,
}) {
    const { scaleFont } = useAuth();
    const contentList = [
        <View style={{
            marginTop: scaleFont(65),
            alignItems: 'center',
        }}>
            <View style={{
                borderRadius: scaleFont(20),
                backgroundColor: '#FFFFFF4D',
                padding: scaleFont(24),
                borderWidth: scaleFont(1),
                borderColor: '#F8F8F8',
            }}>
                <Text style={{
                    fontFamily: 'SFProMedium',
                    fontSize: scaleFont(24),
                    color: '#181818',
                }}>
                    Hold To Answer
                </Text>
                <Text style={{
                    marginTop: scaleFont(15),
                    fontFamily: 'SFPro',
                    fontSize: scaleFont(24),
                    color: '#5F5F5F',
                }}>
                    Voice Message
                </Text>
            </View>
            <View style={{
                position: 'relative',
                marginTop: scaleFont(20),
            }}>
                <View
                    style={{
                        width: scaleFont(125),
                        height: scaleFont(132),
                        borderRadius: scaleFont(125 / 2),
                        backgroundColor: '#6439DBCC',
                        filter: "blur(12px)",
                    }}
                ></View>
                <Image
                    source={require('@/assets/images/aicoach/small_sphere.png')}
                    style={{
                        position: 'absolute',
                        top: scaleFont(-4),
                        width: scaleFont(125),
                        height: scaleFont(132)

                    }}
                />
            </View>
        </View>,
        <View style={{
            marginTop: scaleFont(65),
            alignItems: 'center',
        }}>
            <View style={{
                borderRadius: scaleFont(20),
                backgroundColor: '#FFFFFF4D',
                padding: scaleFont(24),
                borderWidth: scaleFont(1),
                borderColor: '#F8F8F8',
            }}>
                <Text style={{
                    fontFamily: 'SFProMedium',
                    fontSize: scaleFont(24),
                    color: '#181818',
                }}>
                    Hold To Answer
                </Text>
                <Text style={{
                    marginTop: scaleFont(15),
                    fontFamily: 'SFPro',
                    fontSize: scaleFont(24),
                    color: '#5F5F5F',
                }}>
                    Voice Message
                </Text>
            </View>
            <View style={{
                position: 'relative',
                marginTop: scaleFont(20),
            }}>
                <View
                    style={{
                        width: scaleFont(125),
                        height: scaleFont(132),
                        borderRadius: scaleFont(125 / 2),
                        backgroundColor: '#6439DBCC',
                        filter: "blur(12px)",
                    }}
                ></View>
                <Image
                    source={require('@/assets/images/aicoach/small_sphere.png')}
                    style={{
                        position: 'absolute',
                        top: scaleFont(-4),
                        width: scaleFont(125),
                        height: scaleFont(132)

                    }}
                />
            </View>
        </View>,
        <View style={{
            marginTop: scaleFont(102),
            alignItems: 'center',
        }}>
            <Image
                source={require('@/assets/images/aicoach/small_sphere.png')}
                style={{
                    width: scaleFont(214),
                    height: scaleFont(222.82)

                }}
            />
        </View>,
    ]
    return <>
        {contentList[current]}
    </>
}