import { ConfirmButton } from '@/components/Buttons/Confirm';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { showToast } from '@/utils/showToast';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
export default function RelationOne() {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
    const { scaleFont, user } = useAuth();
    const router = useRouter();
    if((user?.friend?.relation as any).find((item:any)=>item.summary==="relationship situation"))
    {
        router.replace('/relationtwo');
    }
    const onContinue = () => {
        axios.put('/auth/addRelation', {
          summary:"relationship situation",
          question:"Tell me about your current relationship situation. How satisfied do you feel with this aspect of your life right now?",
          answer:selectedOption,
        })
        .then(res=>{
            showToast("Relationship update successful");
            router.replace('/relationtwo');
        })
        .catch(err=>{
            showToast("Relationship update failed");
            console.log(err)
        })
    }

    const options = [
        'Single',
        'In a relationship',
        "Engaged",
        'In a civil partnership',
        'Married',
        "It's complicated", 
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
