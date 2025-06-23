import { ConfirmButton } from "@/components/Buttons/Confirm";
import MainLayout from '@/components/MainLayout';
import { useAuth } from "@/context/AuthContext";
import { storage } from '@/utils/localstorage';
import { showToast } from '@/utils/showToast';
import { useRouter } from "expo-router";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Image, KeyboardAvoidingView, Platform, Text, View } from "react-native";
export default function Notify() {
    const { scaleFont } = useAuth();
    const router = useRouter();
    const onSkip = () => {
        storage.set('notification', false);
        router.replace('/payment' as any);
    };
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false} paddingBottom={45} showSkip={true} onSkip={onSkip}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 90} // adjust this if needed
                >
                    <View style={{
                        marginTop: scaleFont(69),
                        paddingHorizontal: scaleFont(21),
                        justifyContent: 'space-between',
                        flexGrow: 1,
                    }}>
                        <View>
                            <Text style={{
                                fontFamily: 'SFProSemiBold',
                                fontSize: scaleFont(48),
                                color: '#181818',
                                lineHeight: scaleFont(57.6),
                            }}>
                                Receive notification from Alex
                            </Text>
                            <Text style={{
                                marginTop: scaleFont(16),
                                fontFamily: 'SFPro',
                                fontSize: scaleFont(16),
                                color: '#5F5F5F',
                                lineHeight: scaleFont(19.2),
                            }}>
                                Get notified when Alex answers a conversation or adds a memory to your timeline.
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: scaleFont(8),
                                marginTop: scaleFont(32),
                                backgroundColor: '#FFFFFFB3',
                                borderRadius: scaleFont(16),
                                paddingVertical: scaleFont(12),
                                paddingHorizontal: scaleFont(8),
                            }}>
                                <View style={{
                                    width: scaleFont(38),
                                    height: scaleFont(38),
                                    borderRadius: scaleFont(8),
                                    backgroundColor: '#FFFFFF',
                                    borderWidth: scaleFont(1),
                                    borderColor: '#F8F8F8',
                                    shadowColor: '#E1E1E1',
                                    shadowOffset: {
                                        width: scaleFont(0),
                                        height: scaleFont(2),
                                    },
                                    shadowOpacity: 0.17,
                                    shadowRadius: scaleFont(2),
                                    elevation: scaleFont(2),
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Image
                                        source={require('@/assets/images/notify/notify.png')}
                                        style={{
                                            width: scaleFont(30),
                                            height: scaleFont(13),
                                        }}
                                    />
                                </View>
                                <View style={{
                                    flex: 1
                                }}>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                        <Text style={{
                                            fontFamily: 'SFProSemiBold',
                                            fontSize: scaleFont(14),
                                            color: '#181818',
                                        }}>Saylo</Text>
                                        <Text style={{
                                            fontFamily: 'SFPro',
                                            fontSize: scaleFont(10),
                                            lineHeight: scaleFont(18),
                                            color: '#3F3F3F',
                                        }}>now</Text>
                                    </View>
                                    <Text style={{
                                        fontFamily: 'SFPro',
                                        fontSize: scaleFont(10),
                                        lineHeight: scaleFont(12),
                                        color: '#5F5F5F',
                                        maxWidth: scaleFont(143),
                                    }}>
                                        Alex answered a couple quize!
                                        Tap to view
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <ConfirmButton
                            onClick={() => {
                                storage.set('notification', true);
                                showToast("Notification successfully enabled.");
                                router.replace("/payment" as any)
                            }}
                            title="Yes"
                            style={{
                                marginTop: scaleFont(24),
                                gap: scaleFont(5)
                            }} />
                    </View>
                </KeyboardAvoidingView>
            </MainLayout>
        </>
    );
}