import MainLayout from '@/components/MainLayout';
import { useWaiting } from '@/context/WaitingContext';
import { showToast } from '@/utils/showToast';
import axios from 'axios';
import { useRouter } from "expo-router";
import { Accelerometer, AccelerometerMeasurement } from 'expo-sensors';
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Dimensions, Image, Platform, Pressable, Share, Text, View } from "react-native";
import { ConfirmButton } from "../../components/Buttons/Confirm";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
const SHAKE_THRESHOLD = 1.5;
export default function Pairing() {
    const { scaleFont, signIn, user } = useAuth();
    const { waiting, setWaiting, delWaiting }: any = useWaiting()
    const { socket } = useSocket();
    const [subscription, setSubscription] = useState<{
        remove: () => void;
    } | null>(null);
    useEffect(() => {
        if (socket) {
            socket.on('pair-success-with-code', (paired) => {
                _unsubscribe();
                showToast(`Paired with ${paired.realname} successfully!!!`)
                signIn({
                    ...user,
                    pairs: [...(user?.pairs || []), {
                        user: {
                            realname: paired.realname,
                            birthday: paired.birthday,
                            email: paired.email,
                        },
                        paid: 0
                    }]
                } as any)
                delWaiting('pair-code');
                setStep(2);
            });
            return () => {
                socket.removeAllListeners('pair-success-with-code');
            }
        }
    }, [socket])
    const [shakeDetected, setShakeDetected] = useState(false);
    const onShare = async () => {
        setWaiting('pair-code');
        try {
            axios.get('/pair/code')
                .then(async (res) => {
                    const code = res.data?.code || '';
                    const result = await Share.share({
                        message: `I’d like to have conversations together in Paired, an app for couples!\n\nTap here to get the app and enter my pairing code: ${code}\n\nhttps://sayloapp.com/api/pair?campaign=No%20User%20Consent&adj_t=qtnxr4y&pairing_code=${code}&adjust_deeplink_js=1&username=${user?.realname}`,
                        title: "Saylo",
                        url: "https://sayloapp.com",
                    });

                    if (result.action === Share.sharedAction) {
                        if (result.activityType) {
                            // shared with activity type
                            showToast('Shared with activity type:' + result.activityType);
                        } else {
                            // shared
                            console.log('Shared successfully');
                        }
                    } else if (result.action === Share.dismissedAction) {
                        // dismissed
                        showToast('Share dismissed');
                    }
                }).catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.error('Error sharing:', error as any);
        }
    };
    const _subscribe = () => {
        if (socket) {
            socket.on('pair-shake-error', (error) => {
                showToast(error)
            });
            socket.on('pair-success', (paired) => {
                _unsubscribe();
                showToast(`Paired with ${paired.realname} successfully!!!`)
                signIn({
                    ...user,
                    pairs: [...(user?.pairs || []), {
                        user: {
                            realname: paired.realname,
                            birthday: paired.birthday,
                            email: paired.email,
                        },
                        paid: 0
                    }]
                } as any)
                delWaiting('pair-shaking');
                setStep(2);
            });
        }
        const sub = Accelerometer.addListener(({ x, y, z }: AccelerometerMeasurement) => {
            const totalAcceleration = Math.sqrt(x * x + y * y + z * z);
            if (totalAcceleration > SHAKE_THRESHOLD) {
                if (!shakeDetected) {
                    setShakeDetected(true);
                    showToast('Shake detected!');
                    setTimeout(() => setShakeDetected(false), 1000);
                }
            }
        });
        setSubscription(sub);
        Accelerometer.setUpdateInterval(100); // update every 100ms
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
        if (socket) {
            socket.emit('pair-shake', {
                shake: false,
            });
            socket.removeAllListeners('pair-shake-error');
            socket.removeAllListeners('pair-success');
        }
    };
    useEffect(() => {
        if ((user?.pairs || []).length > 0) {
            router.replace('/payment' as any);
        }
    }, [])
    useEffect(() => {
        if (subscription) {
            return () => {
                _unsubscribe();
            };
        }
    }, [subscription]);
    useEffect(() => {
        if (socket) {
            socket.emit('pair-shake', {
                shake: shakeDetected,
            });
        }
    }, [shakeDetected]);
    const router = useRouter();
    const [step, setStep] = useState(0);

    const onShaking = () => {
        if (step === 0) {
            setWaiting('pair-shaking');
            setStep(1);
            if (Platform.OS !== 'web') {
                _subscribe();
            }
        } else if (step === 2) {
            router.replace('/notify' as any);
        }
    }
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false} paddingBottom={50}>
                <View style={{
                    marginTop: scaleFont(35),
                    paddingLeft: scaleFont(16),
                    paddingRight: scaleFont(16),
                    justifyContent: 'space-between',
                    flexGrow: 1,
                    minHeight: Dimensions.get('window').height - scaleFont(192),
                }}>
                    <View>
                        <Text style={{
                            fontFamily: 'SFProSemiBold',
                            fontSize: scaleFont(32),
                            color: '#181818',
                            lineHeight: scaleFont(38.4),
                            maxWidth: scaleFont(288)
                        }}>
                            Pair with your partner
                        </Text>
                        <Text style={{
                            marginTop: scaleFont(16),
                            fontFamily: 'SFProSemiBold',
                            fontSize: scaleFont(14),
                            color: '#5F5F5F',
                            lineHeight: scaleFont(16.8),
                            maxWidth: scaleFont(288),
                            minHeight: scaleFont(34)
                        }}>
                            Shake your phone near your partner's phone
                        </Text>
                        <View style={{
                            marginTop: scaleFont(39),
                            alignItems: 'center',
                        }}>
                            <Image
                                source={require('@/assets/images/aicoach/small_sphere.png')}
                                style={{
                                    width: scaleFont(168.77),
                                    height: scaleFont(177)
                                }}
                            />
                        </View>
                        {
                            step === 1 && (
                                <Text style={{
                                    marginTop: scaleFont(17),
                                    fontFamily: 'SFPro',
                                    fontSize: scaleFont(14),
                                    color: '#5F5F5F',
                                    lineHeight: scaleFont(16.8),
                                    textAlign: "center"
                                }}>
                                    Wait please, your phones are pairing
                                </Text>
                            )
                        }
                        {
                            step === 2 && (
                                <Text style={{
                                    marginTop: scaleFont(17),
                                    fontFamily: 'SFPro',
                                    fontSize: scaleFont(14),
                                    color: '#5F5F5F',
                                    lineHeight: scaleFont(16.8),
                                    textAlign: "center"
                                }}>
                                    Done, your phones are paired now!
                                </Text>
                            )
                        }
                    </View>
                    <View style={{
                        alignItems: "center"
                    }}>
                        <ConfirmButton
                            waiting={waiting['pair-shaking']}
                            disabled={waiting['pair-shaking'] || waiting['pair-code']}
                            onClick={onShaking}
                            title="Next"
                            style={{
                                marginTop: scaleFont(24),
                                gap: scaleFont(5)
                            }} />
                        <Pressable
                            style={{
                                marginTop: scaleFont(16),
                                width: scaleFont(333),
                                height: scaleFont(38),
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            disabled={waiting['pair-shaking'] || waiting['pair-code']}
                            onPress={() => {
                                onShare();
                            }}>
                            <Text style={{
                                fontFamily: 'SFProMedium',
                                fontSize: scaleFont(14),
                                color: '#181818',
                                lineHeight: scaleFont(22.4)
                            }}>Pair Code</Text>
                        </Pressable>
                    </View>
                </View>
            </MainLayout>
        </>
    );
}