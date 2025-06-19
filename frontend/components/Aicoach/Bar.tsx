import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";

export default function Bar({
    mainStatus = 0,
    confirmStatus = 0,
    setScreenStatus,
    onCancel,
    setMessageList,
    onConfirm,
    messageList,
}: {
    mainStatus: number,
    confirmStatus: number,
    setScreenStatus: (status: { mainStatus: number; confirmStatus: number; messageStatus: number; contentStatus: number; }) => void,
    onCancel: () => void,
    setMessageList: (messageList: { 0: string; 1: string; 2: string; 3: string }) => void,
    onConfirm: () => void,
    messageList: { 0: string; 1: string; 2: string; 3: string },
}) {
    const recordingRef = useRef<Audio.Recording | null>(null);
    const { scaleFont } = useAuth();
    const [textHover, setTextHover] = useState(false);
    const cancelButton = {
        icon: require('@/assets/images/aicoach/back.png'),
        onPress: onCancel,
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
            onPress: () => setScreenStatus({ mainStatus: 1, confirmStatus: 2, messageStatus: 1, contentStatus: 2 }),
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(24),
            height: scaleFont(24),
        },
        {
            icon: require('@/assets/images/aicoach/complete.png'),
            onPress: async () => {
                if (mainStatus !== 2) {
                    const recording = recordingRef.current;
                    if (!recording) return;

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
                        })
                        .catch((error) => {
                            showToast(error.response.data);
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
        <View style={{
            backgroundColor: '#FFFFFF80',
            borderRadius: scaleFont(50),
            borderWidth: scaleFont(1),
            borderColor: "#F8F8F8",
            paddingVertical: scaleFont(12),
            paddingHorizontal: scaleFont(32),
            alignItems: 'center',
            flexDirection: 'row',
            gap: scaleFont(35),
            marginTop: scaleFont(45),
        }}>
            {[
                cancelButton,
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
                        gap: scaleFont(8),
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