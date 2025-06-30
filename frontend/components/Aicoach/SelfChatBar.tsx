import { useAuth } from "@/context/AuthContext";
import { useWaiting } from "@/context/WaitingContext";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import { encode } from 'base64-arraybuffer';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";

export default function SelfChatBar({
    mainStatus = 0,
    confirmStatus = 0,
    showCancel = true,
    setScreenStatus,
    onCancel,
    setMessageList,
    onConfirm,
    messageList,

}: {
    mainStatus: number,
    confirmStatus: number,
    showCancel: boolean,
    setScreenStatus: (status: { mainStatus: number; confirmStatus: number; messageStatus: number; contentStatus: number; }) => void,
    onCancel: () => void,
    setMessageList: (messageList: { 0: string; 1: string; 2: string; 3: string }) => void,
    onConfirm: () => void,
    messageList: { 0: string; 1: string; 2: string; 3: string },
}) {
    const recordingRef = useRef<Audio.Recording | null>(null);
    const { scaleFont } = useAuth();
    const [textHover, setTextHover] = useState(false);
    const { setWaiting, delWaiting } = useWaiting();
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
    const speakWithOpenAIEle = async (text: string,mode:number) => {
        try {
            // 1. Send TTS request to OpenAI
            const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM/stream', {
                method: 'POST',
                headers: {
                    'xi-api-key': 'sk_27bbe46c104f8847e9e6189df9756f1508b63ca74297bfef', // replace with your key
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: {
                        stability: 0.4,
                        similarity_boost: 0.8
                    }

                }),
            });
            if (!response.ok) throw new Error('Failed to fetch TTS audio');

            // 2. Get audio as binary
            const arrayBuffer = await response.arrayBuffer();
            const base64Audio = encode(arrayBuffer);

            // 3. Save to local file
            const fileUri = FileSystem.documentDirectory + 'openai-voice.mp3';
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (!fileInfo.exists) {
                console.warn("Audio file does not exist at eleval", fileUri);
                return;
            }
            await FileSystem.writeAsStringAsync(fileUri, base64Audio, {
                encoding: FileSystem.EncodingType.Base64
            });
            console.log("Audio file saved at:", fileUri);
            const info = await FileSystem.getInfoAsync(fileUri);
            console.log("File exists at eleval?", info.exists);
            // 4. Load and play the audio automatically
            const { sound } = await Audio.Sound.createAsync(
                { uri: fileUri },
                { shouldPlay: true } // <--- this makes it play immediately
            );

            // Optional: unload when done to free memory
            // sound.setOnPlaybackStatusUpdate(async (status) => {
            //     if (status.isLoaded && status.didJustFinish) {
            //         try {
            //             await sound.unloadAsync();
            //         } catch (e) {
            //             console.warn("Failed to unload audio", e);
            //         }
            //     } else if (!status.isLoaded) {
            //         console.warn("Playback status error:", status);
            //     }
            // });

        } catch (error) {
            console.error('TTS error:', error);
        }
    };
    const speakWithOpenAI = async (text: string,mode:number) => {
        try {
            // 1. Send TTS request to OpenAI
            const response = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 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', // replace with your key
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'tts-1',      // or 'tts-1-hd'
                    input: text,
                    voice: 'nova'        // or shimmer, echo, fable, etc.
                })
            });

            if (!response.ok) throw new Error('Failed to fetch TTS audio');

            // 2. Get audio as binary
            const arrayBuffer = await response.arrayBuffer();
            const base64Audio = encode(arrayBuffer);

            // 3. Save to local file
            const fileUri = FileSystem.documentDirectory + 'openai-voice.mp3';
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (!fileInfo.exists) {
                console.warn("Audio file does not exist at", fileUri);
                return;
            }
            await FileSystem.writeAsStringAsync(fileUri, base64Audio, {
                encoding: FileSystem.EncodingType.Base64
            });
            console.log("Audio file saved at:", fileUri);
            const info = await FileSystem.getInfoAsync(fileUri);
            console.log("File exists?", info.exists);
            // 4. Load and play the audio automatically
            const { sound } = await Audio.Sound.createAsync(
                { uri: fileUri },
                { shouldPlay: true } // <--- this makes it play immediately
            );

            // Optional: unload when done to free memory
            if (mode === 2) {
                sound.setOnPlaybackStatusUpdate(async (status) => {
                    if (status.isLoaded && status.didJustFinish) {
                        try {
                            await sound.unloadAsync();
                        } catch (e) {
                            console.warn("Failed to unload audio", e);
                        }
                    } else if (!status.isLoaded) {
                        console.warn("Playback status error:", status);
                    }
                });
            }

        } catch (error) {
            console.error('TTS error:', error);
        }
    };
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
            onPress: () => setScreenStatus({ mainStatus: 2, confirmStatus: 1, messageStatus: 3, contentStatus: 3 }),
            onTouchStart: () => setTextHover(true),
            onTouchEnd: () => setTextHover(false),
            width: scaleFont(24),
            height: scaleFont(24),
        },
        {
            icon: require('@/assets/images/aicoach/switch_voice.png'),
            onTouchStart: () => { },
            onTouchEnd: () => { },
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
            width: scaleFont(24),
            height: scaleFont(24),
        },
        {
            icon: require('@/assets/images/aicoach/complete.png'),
            onPress: async () => {
                if (mainStatus === 1) {
                    const recording = recordingRef.current;
                    if (!recording) return;

                    await recording.stopAndUnloadAsync();
                    const uri = recording.getURI() as any; // File URI on device
                    const audioData = await FileSystem.readAsStringAsync(uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                    setWaiting("global");
                    axios.post('/coach/self/audio', {
                        audioData,
                    })
                        .then((res) => {
                            delWaiting("global");
                            console.log("eleval", res.data);
                            if (res.data.mode === 1) {
                                speakWithOpenAIEle(res.data.content,res.data.mode);
                            } else {
                                speakWithOpenAI(res.data.content,res.data.mode);
                            }
                            setMessageList({
                                ...messageList,
                                [2]: res.data.content,
                            })
                            setScreenStatus({ mainStatus: 0, confirmStatus: 0, messageStatus: 2, contentStatus: 2 })
                        })
                        .catch((error) => {
                            delWaiting("global");
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