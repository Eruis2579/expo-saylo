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
export default function RelationTwo() {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
    const {delWaiting, setWaiting} = useWaiting();
    const { scaleFont, user,signIn } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if ((user?.friend?.relation as any).find((item: any) => item.summary === "live together")) {
            router.replace('/relationthree');
        }
    }, [user])
    const onContinue = () => {
        setWaiting("global");
        axios.put('/auth/addRelation', {
            summary: "live together",
            question: "Do you live together?",
            answer: selectedOption,
        })
            .then(res => {
                signIn({
                    ...user,
                    friend: {
                        ...user?.friend,
                        relation: [...(user?.friend?.relation || []), {
                            summary: "live together",
                            question: "Do you live together?",
                            answer: selectedOption,
                        }]
                    }
                } as any)
                showToast("Relationship update successful");
                router.replace('/relationthree');
                delWaiting("global");
            })
            .catch(err => {
                showToast(err?.response?.data || "Server error");
                delWaiting("global");
            })
    }

    const options = [
        "Yes",
        "No"
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
                            fontSize: scaleFont(32),
                            color: '#181818',
                            lineHeight: scaleFont(38.4),
                            maxWidth: scaleFont(288)
                        }}>
                            Do you live together?
                        </Text>
                        <View style={{
                            marginTop: scaleFont(27),
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            paddingHorizontal: scaleFont(16),
                            rowGap: scaleFont(16),
                            columnGap: scaleFont(8),
                        }}>
                            {options.map((option, index) => (
                                <Pressable style={{
                                }} onPress={() => {
                                    setSelectedOption(option);
                                }} key={index}>
                                    <LinearGradient
                                        colors={selectedOption === option ? ['#EBD2FE', '#FBB9DD'] : ['#FFFFFF', '#FFFFFF']}
                                        start={{ x: 0.5, y: 0 }}   // middle top
                                        end={{ x: 0.5, y: 1 }}     // middle bottom
                                        style={{
                                            padding: scaleFont(16),
                                            borderRadius: scaleFont(15),
                                        }}
                                    >
                                        <Text style={{
                                            fontFamily: 'SFProMedium',
                                            fontSize: scaleFont(16),
                                            color: selectedOption === option ? '#FFFFFF' : '#181818',
                                        }}>{option}</Text>
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
