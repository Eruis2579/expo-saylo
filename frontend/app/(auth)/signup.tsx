import { ConfirmButton } from '@/components/Buttons/Confirm';
import { LoginButton } from '@/components/Buttons/Login';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

export default function Login() {
  const { scaleFont } = useAuth();
  const textDatas = [
    { title: "Conversations,", font: "SFProSemiBold" },
    { title: "Powered by", font: "SFProSemiBold" },
    { title: "Intelligence", font: "SFProBold" }
  ]
  const onCreateAccount = () => {
    router.replace('/oauth');
  }
  
  return (
    <>
      <MainLayout showHeader={true} showFooter={true} showbar={true} current={0}>
        <View style={{
          marginTop: scaleFont(24),
          paddingHorizontal: scaleFont(16),
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
          <LoginButton title="Log in" onchange={() => router.replace('/login')} />
        </View>

        <View style={{
          marginTop: scaleFont(28),
          flexDirection: 'column',
          paddingLeft: scaleFont(16),
          paddingRight: scaleFont(26),
        }}>
          <Image
            style={{ width: scaleFont(95), height: scaleFont(99) }}
            source={require('@/assets/images/login/sphere.png')}
          />
          <View style={{
            marginTop: scaleFont(17),
          }}>
            {textDatas.map((v, k) => (
              <Text key={k} style={{
                fontFamily: v.font,
                fontSize: scaleFont(48),
                color: '#181818',
                lineHeight: scaleFont(57.6),
              }}>
                {v.title}
              </Text>
            ))}
          </View>
          <View style={{
            marginTop: scaleFont(26),
            maxWidth: scaleFont(230),
            marginHorizontal: "auto"
          }}>
            <Text style={{
              fontFamily: 'SFPro',
              fontSize: scaleFont(14),
              fontWeight: "normal",
              color: '#181818',
              lineHeight: scaleFont(16.8),
            }}>
              Experience the next level of interaction with our AI-driven chat platform.
              Seamlessly communicate and get responses that truly understand you.
            </Text>
          </View>
          <ConfirmButton
            onClick={onCreateAccount}
            title="Create an Account"
            style={{
              marginTop: scaleFont(48),
              gap: scaleFont(5)
            }} />
        </View>
      </MainLayout>
    </>
  );
}
