import { ConfirmButton } from '@/components/Buttons/Confirm';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { showToast } from '@/utils/showToast';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
export default function RelationThree() {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
    const { scaleFont, user } = useAuth();
    const router = useRouter();
    if((user?.friend?.relation as any).find((item:any)=>item.summary==="have kids"))
    {
        router.replace('/dashboard');
    }
    const onContinue = () => {
        axios.put('/auth/addRelation', {
          summary:"have kids",
          question:"Do either of you have kids?",
          answer:selectedOption,
        })
        .then(res=>{
            showToast("Relationship update successful");
            router.replace('/talkai');
        })
        .catch(err=>{
            showToast(err?.response?.data?.message || "Server error");
            console.log(err)
        })
    }

    const options = [
        "Yes",
        "No"
    ];
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false}>
                <View style={{
                    marginTop: scaleFont(32),
                    flexDirection: 'column',
                    paddingLeft: scaleFont(16),
                    paddingRight: scaleFont(16),
                    justifyContent: 'space-between',
                    minHeight: Dimensions.get('window').height - scaleFont(164),
                }}>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        <Text style={{
                            fontFamily: 'SFProSemiBold',
                            fontSize: scaleFont(32),
                            color: '#181818',
                            lineHeight: scaleFont(38.4),
                            maxWidth:scaleFont(288)
                        }}>
                            Do either of you have kids?
                        </Text>
                        <Text style={{
                            marginTop:scaleFont(16),
                            fontFamily: 'SFPro',
                            fontSize: scaleFont(14),
                            color: '#5F5F5F',
                            lineHeight: scaleFont(16.8),
                        }}>
                            Let us know if you or your partner have children either 
                            tohether or from previous relationships.
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
                                <LinearGradient
                                    key={index}
                                    colors={selectedOption === option ? ['#EBD2FE', '#FBB9DD'] : ['#FFFFFF', '#FFFFFF']}
                                    start={{ x: 0.5, y: 0 }}   // middle top
                                    end={{ x: 0.5, y: 1 }}     // middle bottom
                                    style={{
                                        padding: scaleFont(16),
                                        borderRadius: scaleFont(15),
                                    }}
                                >
                                    <Pressable style={{
                                    }} onPress={() => {
                                        setSelectedOption(option);
                                    }}>
                                        <Text style={{
                                            fontFamily: 'SFProMedium',
                                            fontSize: scaleFont(16),
                                            color: selectedOption === option ? '#FFFFFF' : '#181818',
                                        }}>{option}</Text>
                                    </Pressable>
                                </LinearGradient>
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
