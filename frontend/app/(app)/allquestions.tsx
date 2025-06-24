import { ConfirmButton } from "@/components/Buttons/Confirm";
import MainLayout2 from "@/components/MainLayout2";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
export default function Allquestions() {
    const { scaleFont, user, requestPair } = useAuth();
    return (
        <>
            <MainLayout2 showHeader={true} showFooter={false} showbar={false} showTopBar={false} current={0} bg="aicoach.png">
                <View style={{
                    marginTop: scaleFont(51),
                    paddingHorizontal: scaleFont(16),
                    flex: 1,
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: "column",
                        alignItems: 'center',
                    }}>
                        <View style={{
                            alignItems: 'center',
                            maxWidth: scaleFont(295),
                        }}>
                            <Text style={{
                                fontFamily: 'SFProMedium',
                                fontSize: scaleFont(32),
                                color: '#5F5F5F',
                                textAlign: "center"
                            }}>
                                {user?.realname || "Sarah"}
                            </Text>
                            <Text style={{
                                marginTop: scaleFont(16),
                                fontFamily: 'SFProMedium',
                                fontSize: scaleFont(24),
                                color: '#181818',
                                lineHeight: scaleFont(28.8),
                                textAlign: "center"
                            }}>
                                You answered on all my questions. Let’s go!
                            </Text>
                        </View>
                        <View style={{
                            marginTop: scaleFont(115),
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
                        </View>
                    </View>
                    <ConfirmButton
                        onClick={() => {
                            if(requestPair){
                                router.replace("/payment" as any)
                            }else{
                                router.replace("/pairing" as any)
                            }
                        }}
                        title="Continue"
                        style={{
                            marginTop: scaleFont(24),
                            gap: scaleFont(5)
                        }} />
                </View>
            </MainLayout2>
        </>
    )
}