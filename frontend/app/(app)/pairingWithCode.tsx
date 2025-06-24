import { ConfirmButton } from '@/components/Buttons/Confirm';
import MainLayout from '@/components/MainLayout';
import { showToast } from '@/utils/showToast';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Image, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
export default function Pairing() {
    const { scaleFont, setRequestPair, requestPair } = useAuth();
    const [partnerName, setPartnerName] = useState('');
    const [pairCode, setPairCode] = useState('');
    const { code } = useLocalSearchParams();
    useEffect(() => {
        if (requestPair) {
            router.replace('/welcome' as any);
        }
    }, [requestPair])
    useEffect(() => {
        if (typeof code === "string" && code.length > 0) {
            setPairCode(code);
            axios.get("/pair/partner", {
                params: {
                    code: code
                }
            })
                .then(res => {
                    setPartnerName(res.data?.realname || '')
                })
                .catch(err => {
                    showToast(err.response?.data || 'Something went wrong');
                })
        }
    }, [code]);
    const { signIn, user } = useAuth();
    const onContinue = () => {
        axios.post("/pair", {}, {
            params: {
                code: pairCode
            }
        })
            .then(res => {
                const paired = res.data;
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
                setRequestPair(true);
            })
            .catch(err => {
                showToast(err.response?.data || 'Something went wrong');
            })
    }
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false} paddingBottom={45}>
                {!!partnerName && <>
                    <View style={{
                        marginTop: scaleFont(77),
                        flexDirection: 'column',
                        paddingLeft: scaleFont(21),
                        paddingRight: scaleFont(21),
                        justifyContent: 'space-between',
                        flex: 1
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
                                {partnerName} sent you a request!
                            </Text>
                            <Text style={{
                                marginTop: scaleFont(16),
                                maxWidth: scaleFont(230),
                                fontFamily: 'SFPro',
                                fontSize: scaleFont(14),
                                color: '#5F5F5F',
                                lineHeight: scaleFont(16.8),
                            }}>
                                Once you accept, you’ll be able to share answers to questions, quizzes and games.
                            </Text>
                        </View>
                        <ConfirmButton
                            onClick={onContinue}
                            title={`Pair with ${partnerName}`}
                            style={{
                                marginTop: scaleFont(24),
                                gap: scaleFont(5)
                            }} />
                    </View>
                </>}

            </MainLayout>
        </>
    );
}