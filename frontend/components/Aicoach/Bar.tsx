import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, View } from "react-native";

export default function Bar({
    mainStatus = 0,
    confirmStatus = 0,
    showCancel = true,
    setScreenStatus,
    onCancel,
    setMessageList,
    onConfirm,
    messageList,
    waiting,
    setWaiting,

}: {
    mainStatus: number,
    confirmStatus: number,
    showCancel?: boolean,
    setScreenStatus: (status: { mainStatus: number; confirmStatus: number; messageStatus: number; contentStatus: number; }) => void,
    onCancel: () => void,
    setMessageList: (messageList: { 0: string; 1: string; 2: string; 3: string }) => void,
    onConfirm: () => void,
    messageList: { 0: string; 1: string; 2: string; 3: string },
    waiting: boolean,
    setWaiting: (waiting: boolean) => void,
}) {
    const { scaleFont } = useAuth();
    const fadeAnim = useRef(new Animated.Value(1)).current; // Opacity
    const heightAnim = useRef(new Animated.Value(scaleFont(278))).current;
    const [show, setShow] = useState(false);
    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: scaleFont(78), // final height
            duration: 800, // ms
            useNativeDriver: false, // height requires nativeDriver: false
        }).start(
            () => setShow(true)
        );
    }, [])
    const recordingRef = useRef<Audio.Recording | null>(null);
    const [textHover, setTextHover] = useState(false);
    const cancelButton = {
        icon: require('@/assets/images/aicoach/back.png'),
        onPress: async () => {
            if (mainStatus === 1) {
                const recording = recordingRef.current;
                if (!recording) return;

                await recording.stopAndUnloadAsync();
            }
            onCancel();
        },
        onTouchStart: () => { },
        onTouchEnd: () => { },
        width: scaleFont(24),
        height: scaleFont(24),
        id: "cancel"
    }
    const mainButtons = [
        {
            icon: require('@/assets/images/aicoach/recording_init.png'),
            onPress: async () => {
                const permission = await Audio.requestPermissionsAsync();
                if (!permission.granted) {
                    showToast("Permission denied");
                    return;
                }
                await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );
                recordingRef.current = recording;
                setScreenStatus({ mainStatus: 1, confirmStatus: 2, messageStatus: 1, contentStatus: 1 })
            },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(54),
            height: scaleFont(54),
        },
        {
            icon: require('@/assets/images/aicoach/recording.png'),
            onPress: () => { },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(54),
            height: scaleFont(54),
        },
        {
            icon: require('@/assets/images/aicoach/typing.png'),
            onPress: () => { },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(54),
            height: scaleFont(54),
        },
    ];
    const confirmButtons = [
        {
            icon: textHover ? require('@/assets/images/aicoach/text_hover.png') : require('@/assets/images/aicoach/text_init.png'),
            onPress: () => setScreenStatus({ mainStatus: 2, confirmStatus: 1, messageStatus: 0, contentStatus: 3 }),
            onTouchStart: () => setTextHover(true),
            onTouchEnd: () => setTextHover(false),
            width: scaleFont(24),
            height: scaleFont(24),
        },
        {
            icon: require('@/assets/images/aicoach/switch_voice.png'),
            onPress: async () => {
                const permission = await Audio.requestPermissionsAsync();
                if (!permission.granted) {
                    showToast("Permission denied");
                    return;
                }
                await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );
                recordingRef.current = recording;
                setScreenStatus({ mainStatus: 1, confirmStatus: 2, messageStatus: 1, contentStatus: 2 })
            },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(24),
            height: scaleFont(24),
        },
        {
            icon: !waiting ? require('@/assets/images/aicoach/complete.png') : require('@/assets/images/waiting.gif'),
            onPress: async () => {
                if (mainStatus === 1) {
                    setWaiting(true);
                    const recording = recordingRef.current;
                    if (!recording) {
                        setWaiting(false);
                        return;
                    }

                    await recording.stopAndUnloadAsync();
                    const uri = recording.getURI() as any; // File URI on device
                    const audioData = await FileSystem.readAsStringAsync(uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                    axios.post('/coach/transcribe', {
                        audioData,
                    })
                        .then((res) => {
                            showToast(res.data);
                            setMessageList({
                                ...messageList,
                                [2]: res.data,
                            })
                            setScreenStatus({ mainStatus: 0, confirmStatus: 3, messageStatus: 2, contentStatus: 2 })
                            setWaiting(false);
                        })
                        .catch((error) => {
                            showToast(error.response.data);
                            setWaiting(false);
                        })
                } else {
                    onConfirm();
                }
            },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(24),
            height: scaleFont(24),
        },
        {
            icon: require('@/assets/images/aicoach/next.png'),
            onPress: () => {
                onConfirm();
            },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(24),
            height: scaleFont(24),
        },
    ];
    return (
        <>
            {
                show && (
                    <View style={{
                        backgroundColor: '#FFFFFF80',
                        borderRadius: scaleFont(50),
                        borderWidth: scaleFont(1),
                        borderColor: "#F8F8F8",
                        width: scaleFont(236),
                        height: scaleFont(78),
                        alignItems: 'center',
                        justifyContent: "center",
                        flexDirection: 'row',
                        ...(showCancel ? { gap: scaleFont(35) } : { gap: scaleFont(48) }),
                    }}>
                        {[
                            ...(showCancel ? [cancelButton] : []),
                            mainButtons[mainStatus],
                            confirmButtons[confirmStatus]
                        ].map((button, index) => (
                            <Pressable
                                key={index}
                                onPress={button.onPress}
                                onTouchStart={button.onTouchStart}
                                onTouchEnd={button.onTouchEnd}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={button.icon}
                                    style={{
                                        width: button.width,
                                        height: button.height,
                                    }}
                                />
                            </Pressable>
                        ))}

                    </View>
                )
            }
            <Animated.View style={{
                position: 'absolute',
                zIndex: 100,
                bottom: scaleFont(0),
                backgroundColor: '#FFFFFF80',
                borderRadius: scaleFont(60),
                borderWidth: scaleFont(1),
                borderColor: "#F8F8F8",
                width: scaleFont(236),
                height: heightAnim,
                flexDirection: 'row',
                justifyContent: "center",
                ...(showCancel ? { gap: scaleFont(35) } : { gap: scaleFont(48) }),
            }}>
                {[
                    ...(showCancel ? [cancelButton] : []),
                    mainButtons[mainStatus],
                    confirmButtons[confirmStatus]
                ].map((button, index) => (
                    <Pressable
                        key={index}
                        onPress={button.onPress}
                        onTouchStart={button.onTouchStart}
                        onTouchEnd={button.onTouchEnd}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={button.icon}
                            style={{
                                width: button.width,
                                height: button.height,
                            }}
                        />
                    </Pressable>
                ))}

            </Animated.View>
        </>
    )
}