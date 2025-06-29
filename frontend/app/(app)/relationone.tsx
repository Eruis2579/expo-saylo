import { ConfirmButton } from '@/components/Buttons/Confirm';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { useWaiting } from '@/context/WaitingContext';
import { showToast } from '@/utils/showToast';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
export default function RelationOne() {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
    const { setWaiting, delWaiting } = useWaiting();
    const { scaleFont, user, signIn } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if ((user?.friend?.relation as any).find((item: any) => item.summary === "relationship situation")) {
            router.replace('/relationtwo');
        }
    }, [user])
    const onContinue = () => {
        setWaiting("global");
        axios.put('/auth/addRelation', {
            summary: "relationship situation",
            question: "Tell me about your current relationship situation. How satisfied do you feel with this aspect of your life right now?",
            answer: selectedOption,
        })
            .then(res => {
                showToast("Relationship update successful");
                signIn({
                    ...user,
                    friend: {
                        ...user?.friend,
                        relation: [...(user?.friend?.relation || []), {
                            summary: "relationship situation",
                            question: "Tell me about your current relationship situation. How satisfied do you feel with this aspect of your life right now?",
                            answer: selectedOption,
                        }]
                    }
                } as any)
                router.replace('/relationtwo');
                delWaiting("global");
            })
            .catch(err => {
                showToast(err?.response?.data || "Server error");
                delWaiting("global");
            })
    }

    const options = [
        { title: 'Single', px: scaleFont(28.5), py: scaleFont(16) },
        { title: 'In a relationship', px: scaleFont(18.5), py: scaleFont(16) },
        { title: "Engaged", px: scaleFont(25.5), py: scaleFont(16) },
        { title: 'In a civil partnership', px: scaleFont(16), py: scaleFont(16) },
        { title: 'Married', px: scaleFont(16), py: scaleFont(16) },
        { title: "It's complicated", px: scaleFont(16), py: scaleFont(16) },
    ];
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false} paddingBottom={45}>
                <View style={{
                    marginTop: scaleFont(32),
                    flexDirection: 'column',
                    paddingLeft: scaleFont(16),
                    paddingRight: scaleFont(16),
                    justifyContent: 'space-between',
                    flex:1
                }}>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        <Text style={{
                            fontFamily: 'SFProSemiBold',
                            fontSize: scaleFont(24),
                            color: '#181818',
                            lineHeight: scaleFont(28.8),
                        }}>
                            Tell me about your current relationship situation.
                            How satisfied do you feel with this aspect of your life right now?
                        </Text>
                        <View style={{
                            marginTop: scaleFont(32),
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-evenly',
                            paddingHorizontal: scaleFont(13.5),
                            rowGap: scaleFont(16),
                            columnGap: scaleFont(8),
                        }}>
                            {options.map((option, index) => (
                                <Pressable style={{
                                }} onPress={() => {
                                    setSelectedOption(option.title);
                                }} key={index}>
                                    <LinearGradient
                                        colors={selectedOption === option.title ? ['#EBD2FE', '#FBB9DD'] : ['#FFFFFF', '#FFFFFF']}
                                        start={{ x: 0.5, y: 0 }}   // middle top
                                        end={{ x: 0.5, y: 1 }}     // middle bottom
                                        style={{
                                            paddingHorizontal: option.px,
                                            paddingVertical: option.py,
                                            borderRadius: scaleFont(15),
                                        }}
                                    >
                                        <Text style={{
                                            fontFamily: 'SFProMedium',
                                            fontSize: scaleFont(16),
                                            color: selectedOption === option.title ? '#FFFFFF' : '#181818',
                                        }}>{option.title}</Text>
                                    </LinearGradient>
                                </Pressable>
                            ))}
                        </View>
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
