import LoginLogo from '@/assets/images/logo/welcome.svg';
import { ConfirmButton } from '@/components/Buttons/Confirm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
export default function Welcome() {
    const { scaleFont } = useAuth();
    const router = useRouter();
    const onContinue = () => {
        router.replace('/info');
    }
    return (
        <>
            <View style={{
                marginTop: scaleFont(77),
                flexDirection: 'column',
                paddingLeft: scaleFont(21),
                paddingRight: scaleFont(21),
                justifyContent: 'space-between',
                minHeight:Dimensions.get('window').height - scaleFont(208),
            }}>
                <View style={{
                    flexDirection: 'column',
                }}>
                    <Image
                        style={{ width: scaleFont(95), height: scaleFont(99) }}
                        source={require('@/assets/images/login/sphere.png')}
                    />
                    <Text style={{
                        marginTop: scaleFont(17),
                        fontFamily: 'SFProSemiBold',
                        fontSize: scaleFont(48),
                        color: '#181818',
                        lineHeight: scaleFont(57.6),
                    }}>
                        Welcome to
                    </Text>
                    <LoginLogo style={{
                        width: scaleFont(206),
                        height: scaleFont(87),
                    }} />
                    <Text style={{
                        marginTop: scaleFont(16),
                        maxWidth: scaleFont(230),
                        fontFamily: 'SFPro',
                        fontSize: scaleFont(14),
                        color: '#5F5F5F',
                        lineHeight: scaleFont(16.8),
                    }}>
                        To personalize your experience, we’ll ask you a few questions
                    </Text>
                </View>
                <ConfirmButton
                    onClick={onContinue}
                    title="Continue"
                    style={{
                        marginTop: scaleFont(24),
                        gap: scaleFont(5)
                    }} />
            </View>
        </>
    );
}
