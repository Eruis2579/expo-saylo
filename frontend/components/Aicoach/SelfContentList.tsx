import { useAuth } from "@/context/AuthContext";
import { Image, Text, View } from "react-native";
import GradientInput from "../Input/GradientInput";
export default function ContentList({
    current,
    textData,
    setTextData,
}: {
    current: number,
    textData: string,
    setTextData: (text: string) => void
}) {
    const { scaleFont } = useAuth();
    const contentList = [
        <View style={{
            alignItems: 'center',
            marginTop:scaleFont(31)
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
            marginTop: scaleFont(44),
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
        <View style={{
            marginTop: scaleFont(73),
            alignItems: 'center',
        }}>
            <View style={{
                position: 'relative',
            }}>
                <View
                    style={{
                        width: scaleFont(214),
                        height: scaleFont(222.82),
                        borderRadius: scaleFont(214 / 2),
                        backgroundColor: '#6439DBCC',
                        filter: "blur(25px)",
                    }}
                ></View>
                <Image
                    source={require('@/assets/images/aicoach/small_sphere.png')}
                    style={{
                        position: 'absolute',
                        top: scaleFont(-4),
                        width: scaleFont(214),
                        height: scaleFont(222.82)

                    }}
                />
            </View>
        </View>,
        <View style={{
            width:scaleFont(344),
            marginTop: scaleFont(27),
            backgroundColor: '#FFFFFF80',
            borderRadius: scaleFont(20),
            borderWidth: scaleFont(1),
            borderColor: '#F8F8F8',
            paddingVertical: scaleFont(24),
            paddingHorizontal: scaleFont(11),
        }}>
            <GradientInput
                showTitle={false}
                placeholder="Type here"
                value={textData}
                onChangeText={(text) => setTextData(text)}
            />
        </View>
    ]
    return <>
        {contentList[current]}
    </>
}