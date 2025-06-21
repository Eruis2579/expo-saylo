import { ConfirmButton } from '@/components/Buttons/Confirm';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
export default function RelationInit() {
    const { scaleFont } = useAuth();
    const router = useRouter();
    const onContinue = () => {
        router.replace('/relationone');
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
                            Get Ready to explore your relationship
                        </Text>
                        <Text style={{
                            marginTop: scaleFont(16),
                            fontFamily: 'SFPro',
                            fontSize: scaleFont(14),
                            color: '#5F5F5F',
                            lineHeight: scaleFont(16.8),
                        }}>
                            We’ll ask a few details about your relationship to provide you with relevant couple conversations
                        </Text>
                    </View>
                    <ConfirmButton
                        onClick={onContinue}
                        title="Next"
                        style={{
                            marginTop: scaleFont(24),
                            gap: scaleFont(5)
                        }} />
                </View>
            </MainLayout>
        </>
    );
}
