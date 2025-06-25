import Bar from "@/components/Aicoach/Bar";
import ContentList from "@/components/Aicoach/ContentList";
import { ConfirmButton } from "@/components/Buttons/Confirm";
import MainLayout2 from "@/components/MainLayout2";
import MainLayout from "@/components/MainLayout3";
import { useAuth } from "@/context/AuthContext";
import { storage } from "@/utils/localstorage";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, KeyboardAvoidingView, Platform, Text, View } from "react-native";

const questionList = [
    {
        question: "tell me more about yours releationship.",
        summary: "your relationship"
    },
    {
        question: "What's the biggest challenge you're facing in your relationships right now - whether romantic, family, friendships, or even with yourself?",
        summary: "biggest challenge"
    },
    {
        question: "How do you typically handle conflicts or difficult conversations? Do you tend to avoid them, get emotional, shut down, or confront directly?",
        summary: "conflict handling"
    },
    {
        question: "When you're feeling overwhelmed, anxious, or upset, what usually happens? How do you cope, and how does it affect your relationships?",
        summary: "cope"
    },
    {
        question: "In close relationships, do you find yourself needing lots of reassurance, preferring independence, or somewhere in between? How easily do you trust others?",
        summary: "trust"
    },
    {
        question: "How would you describe the relationships you saw growing up in your family? What patterns do you notice you might be repeating or trying to avoid?",
        summary: "family"
    },
    {
        question: "How comfortable are you with saying 'no' to others? Do you often put others' needs before your own, or do you prioritize yourself first?",
        summary: "comfortable"
    },
    {
        question: "What would your ideal relationship (romantic, family, or friendship) look like? What specific changes would make you feel more fulfilled in your connections with others?",
        summary: "ideal relationship"
    },
    {
        question: "Who can you talk to when you're struggling? Do you feel like you have people who truly understand you, or do you often feel alone with your problems?",
        summary: "support"
    }
]
export default function Qone() {
    const backgroundFadeAnim = useRef(new Animated.Value(1)).current; // Background opacity
    const fadeAnim = useRef(new Animated.Value(1)).current; // Opacity
    const scaleAnim = useRef(new Animated.Value(1)).current; // Scale X & Y
    const translateYAnim = useRef(new Animated.Value(0)).current; // Move downward
    const translateXAnim = useRef(new Animated.Value(0)).current; // Move downward

    useEffect(() => {
        Animated.parallel([
            Animated.timing(backgroundFadeAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
            // Animated.timing(scaleAnim, {
            //     toValue: 0.1, // shrink to 30% size
            //     duration: 1000,
            //     useNativeDriver: true,
            // }),
            Animated.timing(translateYAnim, {
                toValue: 900, // move down by 100px
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(translateXAnim, {
                toValue: 100, // move down by 100px
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // After animation, navigate
        });
    }, [])
    const { scaleFont, user, signIn } = useAuth();
    const [screenStatus, setScreenStatus] = useState({
        mainStatus: 0,
        confirmStatus: 0,
        messageStatus: 0,
        contentStatus: 0,
    })
    useEffect(() => {
        async function checkPopup() {
            if (await storage.get('qonepop') !== true) {
                router.replace('/qonepop' as any)
            }
        }
        checkPopup()
    }, [])
    const [waiting, setWaiting] = useState(false);
    const [messageList, setMessageList] = useState({
        0: "",
        1: "You're talking now...",
        2: "",
        3: "",
    })
    useEffect(() => {
        const nextMessage = questionList.find(v => !user?.self?.find(s => s.summary === v.summary));
        if (nextMessage) {
            setScreenStatus({ mainStatus: 0, confirmStatus: 0, messageStatus: 0, contentStatus: 0 })
            setMessageList({
                0: nextMessage?.question || "",
                1: "You're talking now...",
                2: "",
                3: nextMessage?.summary || "",
            })
        } else {
            if (messageList[3] === "support") {
                router.replace('/allquestions');
            } else {
                router.replace('/pairing' as any);
            }
        }
    }, [user])
    const onCancelFunc = {
        0: () => { router.replace('/talkai' as any) },
        1: () => { setScreenStatus({ mainStatus: 0, confirmStatus: 0, messageStatus: 0, contentStatus: 0 }) },
        2: () => { setScreenStatus({ mainStatus: 0, confirmStatus: 0, messageStatus: 0, contentStatus: 0 }) },
    }
    useEffect(() => {
        setScreenStatus(screenStatus => {
            if (screenStatus.mainStatus === 2 && messageList[2].trim().length > 0) {
                if (screenStatus.confirmStatus !== 2) {
                    return { ...screenStatus, confirmStatus: 2 }
                }
            } else {
                if (screenStatus.confirmStatus === 2) {
                    return { ...screenStatus, confirmStatus: 1 }
                }
            }
            return screenStatus;
        })
    }, [messageList])
    const onConfirm = () => {
        setWaiting(true);
        axios.put('/coach/register/self', {
            summary: messageList[3],
            question: messageList[0],
            answer: messageList[2],
        })
            .then(res => {
                signIn({
                    ...user,
                    self: [...(user?.self || []), {
                        summary: messageList[3],
                        question: messageList[0],
                        answer: messageList[2],
                    }]
                } as any)
                showToast("Answer is successfully saved");
                setWaiting(false);
            })
            .catch(err => {
                showToast(err?.response?.data || "Server error");
                setWaiting(false);
            })
    }
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
                                    fontSize: screenStatus.messageStatus === 2 ? scaleFont(24) : (messageList[3] === "your relationship" ? scaleFont(32) : scaleFont(18)),
                                    color: '#181818',
                                    lineHeight: screenStatus.messageStatus === 2 ? scaleFont(28.8) : (messageList[3] === "your relationship" ? scaleFont(38.4) : scaleFont(21.6)),
                                    textAlign: "center"
                                }}>
                                    {messageList[screenStatus.messageStatus as keyof typeof messageList]}
                                </Text>
                            </View>
                            <ContentList current={screenStatus.contentStatus} textData={messageList[2]} setTextData={(text) => { setMessageList({ ...messageList, [2]: text }) }} />
                        </View>
                        <Bar
                            onCancel={onCancelFunc[screenStatus.mainStatus as keyof typeof onCancelFunc]}
                            mainStatus={screenStatus.mainStatus}
                            confirmStatus={screenStatus.confirmStatus}
                            setScreenStatus={setScreenStatus}
                            setMessageList={setMessageList}
                            messageList={messageList}
                            onConfirm={onConfirm}
                            waiting={waiting}
                            setWaiting={setWaiting}
                        />
                    </View>
                </KeyboardAvoidingView>
            </MainLayout2>
            <Animated.View
                style={{
                    position: 'absolute',
                    zIndex:100,
                    opacity: fadeAnim,
                    transform: [
                        { translateY: translateYAnim },
                        { translateX: translateXAnim },
                    ],
                }}
            >
                <MainLayout showHeader={true} showFooter={false} showbar={false} paddingBottom={45} backgroundFadeAnim={backgroundFadeAnim}>
                    <KeyboardAvoidingView
                        style={{
                            marginTop: scaleFont(48),
                            flexDirection: 'column',
                            paddingLeft: scaleFont(21),
                            paddingRight: scaleFont(21),
                            justifyContent: 'space-between',
                            flex: 1,
                        }}
                    >
                        <View style={{ flexDirection: 'column' }}>
                            <Image
                                style={{ width: scaleFont(95), height: scaleFont(99) }}
                                source={require('@/assets/images/login/sphere.png')}
                            />
                            <Text
                                style={{
                                    marginTop: scaleFont(17),
                                    fontFamily: 'SFProSemiBold',
                                    fontSize: scaleFont(48),
                                    color: '#181818',
                                    lineHeight: scaleFont(57.6),
                                }}
                            >
                                Talk with our AI
                            </Text>
                            <Text
                                style={{
                                    marginTop: scaleFont(16),
                                    fontFamily: 'SFPro',
                                    fontSize: scaleFont(14),
                                    color: '#5F5F5F',
                                    lineHeight: scaleFont(16.8),
                                }}
                            >
                                A short questionnaire from our AI to get to know your relationship better.
                                All you need to do is talk to AI
                            </Text>
                        </View>

                        <ConfirmButton
                            title="Continue"
                            style={{
                                marginTop: scaleFont(24),
                                gap: scaleFont(5),
                            }}
                        />
                    </KeyboardAvoidingView>
                </MainLayout>
            </Animated.View>
        </>
    )
}