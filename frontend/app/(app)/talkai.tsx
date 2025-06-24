import { ConfirmButton } from '@/components/Buttons/Confirm';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Image, Text, View } from 'react-native';

export default function talkAi() {
    const { scaleFont, user } = useAuth();
    const router = useRouter();

    // Animation values
    const fadeAnim = useRef(new Animated.Value(1)).current; // Opacity
    const scaleAnim = useRef(new Animated.Value(1)).current; // Scale X & Y
    const translateYAnim = useRef(new Animated.Value(0)).current; // Move downward

    const onContinue = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.3, // shrink to 30% size
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 100, // move down by 100px
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // After animation, navigate
            router.replace('/qone');
        });
    };

    return (
        <MainLayout showHeader={true} showFooter={false} showbar={false} paddingBottom={45}>
            <Animated.View
                style={{
                    marginTop: scaleFont(48),
                    flexDirection: 'column',
                    paddingLeft: scaleFont(21),
                    paddingRight: scaleFont(21),
                    justifyContent: 'space-between',
                    flex: 1,
                    opacity: fadeAnim,
                    transform: [
                        { translateY: translateYAnim },
                        { scale: scaleAnim },
                    ],
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
                    onClick={onContinue}
                    title="Continue"
                    style={{
                        marginTop: scaleFont(24),
                        gap: scaleFont(5),
                    }}
                />
            </Animated.View>
        </MainLayout>
    );
}
