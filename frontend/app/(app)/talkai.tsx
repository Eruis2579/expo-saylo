import { ConfirmButton } from '@/components/Buttons/Confirm';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
export default function talkAi() {
    const { scaleFont,user } = useAuth();
    const router = useRouter();
    const onContinue = () => {
        router.replace('/dashboard');
    }
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false}>
                <View style={{
                    marginTop: scaleFont(48),
                    flexDirection: 'column',
                    paddingLeft: scaleFont(21),
                    paddingRight: scaleFont(21),
                    justifyContent: 'space-between',
                    minHeight: Dimensions.get('window').height - scaleFont(179),
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
                            Talk with our AI 
                        </Text>
                        <Text style={{
                            marginTop: scaleFont(16),
                            fontFamily: 'SFPro',
                            fontSize: scaleFont(14),
                            color: '#5F5F5F',
                            lineHeight: scaleFont(16.8),
                        }}>
                            A short questionnaire from our AI to get to know your relationship better. 
                            All you need to do is talk to AI
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
            </MainLayout>
        </>
    );
}
