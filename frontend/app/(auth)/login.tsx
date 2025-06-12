import { LoginButton } from '@/components/Buttons/Login';
import { OauthButton } from '@/components/Buttons/Oauth';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import { router, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Linking, Platform, Text, View } from 'react-native';
const CLIENT_ID = '581399054116-uo6cbeieehqhk44t250f87td1u5cnmhi.apps.googleusercontent.com';
const REDIRECT_URI = AuthSession.makeRedirectUri({
    native: 'com.jonyspanda.frontend:/oauthredirect', // matches your scheme
});
// "http://172.16.3.163:18080/auth/login"
const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
};

export default function Oauth() {
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: CLIENT_ID,
            redirectUri: REDIRECT_URI,
            scopes: ['openid', 'profile', 'email'],
            responseType: 'code',
            usePKCE: true,
        },
        discovery
    );
    useEffect(() => {
        if (result?.type === 'success') {
            const { code } = result.params;

            axios.post('http://localhost:3000/auth/google', {
                code,
                redirectUri: REDIRECT_URI,
                codeVerifier: request?.codeVerifier,
            }).then(res => {
                console.log('Tokens:', res.data);
            }).catch(err => {
                console.error('Error exchanging token:', err);
            });
        }
    }, [result]);


    const { scaleFont } = useAuth();
    const textDatas = [
        { title: "Conversations,", font: "SFProSemiBold" },
        { title: "Powered by", font: "SFProSemiBold" },
        { title: "Intelligence", font: "SFProBold" }
    ]
    const onGoogleOauth = () => {
        const url = "https://47e6-103-14-26-70.ngrok-free.app/api/auth/google";
        if (Platform.OS === 'web') {
            window.location.href = url;
        } else {
            // promptAsync();
            Linking.openURL(url);
        }
    }
    const onAppleOauth = () => {
        const url = "https://47e6-103-14-26-70.ngrok-free.app/api/auth/apple";
        // if (Platform.OS === 'web') {
            // window.location.href = url;
            useRouter().replace('/welcome');
        // } else {
            // promptAsync();
            // Linking.openURL('http://localhost:3000/auth/apple');
        // }
    }
    return (
        <>
            <View style={{
                marginTop: scaleFont(24),
                paddingHorizontal: scaleFont(16),
                flexDirection: 'row',
                justifyContent: 'flex-end',
            }}>
                <LoginButton title="Sign up" onchange={() => router.replace('/signup')} />
            </View>

            <View style={{
                marginTop: scaleFont(28),
                flexDirection: 'column',
                paddingLeft: scaleFont(21),
                paddingRight: scaleFont(21),
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
                    marginTop: scaleFont(48),
                    marginHorizontal: "auto",
                    gap: scaleFont(16)
                }}>
                    <OauthButton title="Log in Using Google Account" icon="google" onClick={() => onGoogleOauth()} />
                    <OauthButton title="Log in Using Apple Account" icon="apple" onClick={onAppleOauth} />
                </View>

            </View>
        </>
    );
}
