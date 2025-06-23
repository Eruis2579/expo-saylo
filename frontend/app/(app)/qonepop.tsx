import BarPopup from "@/components/Aicoach/BarPopup";
import ContentListPopup from "@/components/Aicoach/ContentListPopup";
import PopupButton from "@/components/Buttons/PopupButton";
import MainLayout2 from "@/components/MainLayout2";
import { useAuth } from "@/context/AuthContext";
import { storage } from "@/utils/localstorage";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";

export default function Qonepop() {
    const { scaleFont, user, signIn } = useAuth();
    const messageList = {
        0: "tell me more about yours releationship.",
        1: "tell me more about yours releationship.",
        2: "Yes, this is a problem when a couple is together for too long and do nothing for the relationship"
    }
    const [showPopupStep, setShowPopupStep] = useState(0);

    const steps = [
        {
            title: "Press to Answer",
            description: "Press the microphone button to talk to the AI coach",
            margin: 540,
            pointer:"53%"
        },
        {
            title: "Press to Answer",
            description: "If you are unable to speak now, just press the pen button and write ",
            margin: 525,
            pointer:"77%"
        },
        {
            title: "Press to button “Done”",
            description: "If you are done talking / writing, then to finish your answer and get a response from the AI coach, press “Done”",
            margin: 510,
            pointer:"77%"
        }
    ]
    return (
        <>
            <MainLayout2 showHeader={true} showFooter={false} showbar={false} showTopBar={false} paddingBottom={39} current={0} bg="aicoach.png">
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 90} // adjust this if needed
                >
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
                                    Hey {user?.realname || "Sarah"},
                                </Text>
                                <Text style={{
                                    marginTop: scaleFont(16),
                                    fontFamily: 'SFProMedium',
                                    fontSize: scaleFont(24),
                                    color: '#181818',
                                    lineHeight: scaleFont(28.8),
                                    textAlign: "center"
                                }}>
                                    {messageList[0]}
                                </Text>
                            </View>
                            <ContentListPopup current={showPopupStep} />
                        </View>
                        <BarPopup current={showPopupStep} />
                    </View>
                </KeyboardAvoidingView>
            </MainLayout2>
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "100%",
                backgroundColor: "#000000AA",
                paddingHorizontal: scaleFont(16)
            }}>
                <View style={{
                    marginTop: scaleFont(steps[showPopupStep].margin),
                    padding: scaleFont(16),
                    backgroundColor: "#FFFFFF",
                    borderRadius: scaleFont(25),
                    borderWidth: scaleFont(1),
                    borderColor: "#F8F8F8",
                    position: "relative",
                }}>
                    <View style={{
                        position: "absolute",
                        width: scaleFont(16),
                        height: scaleFont(16),
                        left: steps[showPopupStep].pointer,
                        bottom: scaleFont(-8),
                        borderRadius: scaleFont(3),
                        transform: "rotateZ(-45deg)",
                        backgroundColor: "#FFFFFF",
                    } as any} />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Text style={{
                            paddingTop: scaleFont(8),
                            fontFamily: "SFProBold",
                            fontSize: scaleFont(16),
                            lineHeight: scaleFont(19.2),
                            color: "#181818"
                        }}>{steps[showPopupStep].title}</Text>
                        <Pressable onPress={() => {
                            storage.set('qonepop', true);
                            router.replace("/qone")
                        }}>
                            <Image source={require('@/assets/images/dashboard/cancel.png')} style={{
                                width: scaleFont(20),
                                height: scaleFont(20),
                                paddingBottom: scaleFont(7)
                            }} />
                        </Pressable>
                    </View>
                    <Text style={{
                        marginTop: scaleFont(12),
                        fontFamily: "SFPro",
                        fontSize: scaleFont(14),
                        lineHeight: scaleFont(16.8),
                        color: "#5F5F5F"
                    }}>
                        {steps[showPopupStep].description}
                    </Text>
                    <View style={{
                        marginTop: scaleFont(13),
                        height: scaleFont(49),
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: scaleFont(2)
                        }}>
                            <Text style={{
                                fontFamily: "SFProBold",
                                fontSize: scaleFont(12),
                                letterSpacing: scaleFont(1),
                                color: "#181818"
                            }}>{showPopupStep + 1}</Text>
                            <Text style={{
                                fontFamily: "SFProBold",
                                fontSize: scaleFont(12),
                                letterSpacing: scaleFont(1),
                                color: "#5F5F5F99"
                            }}>/3</Text>
                        </View>
                        <PopupButton onPress={() => {
                            if (showPopupStep === 2) {
                                storage.set('qonepop', true);
                                router.replace("/qone");
                            } else {
                                setShowPopupStep(showPopupStep + 1)
                            }
                        }} />
                    </View>
                </View>
                <BarPopup current={showPopupStep} />
            </View>
        </>
    )
}