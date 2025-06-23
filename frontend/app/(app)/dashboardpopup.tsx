import PopupButton from '@/components/Buttons/PopupButton';
import Daily from '@/components/Dashboard/Daily';
import DailyPopup from '@/components/Dashboard/DailyPopup';
import Flow from '@/components/Dashboard/Flow';
import FlowPopup from '@/components/Dashboard/FlowPopup';
import Name from '@/components/Dashboard/Name';
import Overall from '@/components/Dashboard/Overall';
import OverallPopup from '@/components/Dashboard/OverallPopup';
import Tab from '@/components/Dashboard/Tab';
import TabPopup from '@/components/Dashboard/TabPopup';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/utils/localstorage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
export default function DashboardPopup() {
    const { scaleFont, user } = useAuth();
    const [showPopupStep, setShowPopupStep] = useState(0);

    const steps = [
        {
            title: "Daily Coaching",
            description: "Receive expert guidance tailored to your specific relationship challenges and goals.",
            content:<DailyPopup />,
            pointer:"top",
            margin:17.63
        },
        {
            title: "Progress Tracking",
            description: "Monitor your emotional intelligence development and relationship milestones in real-time.",
            content:<OverallPopup />,
            pointer:"bottom",
            margin:210
        },
        {
            title: "Filter References",
            description: "Track your progress in all directions and see your relationship growth over time.",
            content:<FlowPopup />,
            pointer:"bottom",
            margin:380
        },
        {
            title: "Chat with AI Coaching",
            description: "Learn proven techniques to improve conversations and deepen your connection with your partner",
            content:<TabPopup style={{
                marginTop:scaleFont(25)
            }}/>,
            pointer:"bottom",
            margin:550
        },
    ]
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false} showTopBar={true} current={0} firstbg="#FFFFFF" secondbg="#FFFFFF" paddingBottom={31}>
                <View style={{
                    position: "relative"
                }}>
                    <Name />
                    <View style={{
                        justifyContent: "space-between",
                        paddingHorizontal: scaleFont(16),
                        minHeight: Dimensions.get('window').height - scaleFont(196.6),
                    }}>
                        <View>
                            <Daily />
                            <Overall />
                            <Flow />
                        </View>
                        <Tab current={0} />
                    </View>

                </View>
            </MainLayout >
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "100%",
                backgroundColor: "#000000AA",
                paddingHorizontal: scaleFont(16)
            }}>
                {steps[showPopupStep].pointer === "top" && steps[showPopupStep].content}
                <View style={{
                    padding: scaleFont(16),
                    backgroundColor: "#FFFFFF",
                    borderRadius: scaleFont(25),
                    
                    borderWidth: scaleFont(1),
                    borderColor: "#F8F8F8",
                    position: "relative",
                    marginTop: scaleFont(steps[showPopupStep].margin),
                }}>
                    <View style={{
                        position: "absolute",
                        width:scaleFont(16),
                        height:scaleFont(16),
                        left: "50%",
                        borderRadius:scaleFont(3),
                        transform: "rotateZ(-45deg)",
                        backgroundColor: "#FFFFFF",
                        ...(steps[showPopupStep].pointer === "top" ? {top: scaleFont(-8)} : {bottom: scaleFont(-8)}),
                    }} />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Text style={{
                            paddingTop: scaleFont(8),
                            fontFamily: "SFProBold",
                            fontSize: scaleFont(16),
                            lineHeight: scaleFont(19.2),
                            color: "#181818"
                        }}>{steps[showPopupStep].title}</Text>
                        <Pressable onPress={() => {
                            storage.set('dashboardpop', true);
                            router.replace("/dashboard")
                            }}>
                            <Image source={require('@/assets/images/dashboard/cancel.png')} style={{
                                width: scaleFont(20),
                                height: scaleFont(20),
                                paddingBottom: scaleFont(7)
                            }} />
                        </Pressable>
                    </View>
                    <Text style={{
                        marginTop: scaleFont(12),
                        fontFamily: "SFPro",
                        fontSize: scaleFont(14),
                        lineHeight: scaleFont(16.8),
                        color: "#5F5F5F"
                    }}>
                        {steps[showPopupStep].description}
                    </Text>
                    <View style={{
                        marginTop: scaleFont(13),
                        height: scaleFont(49),
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: scaleFont(2)
                        }}>
                            <Text style={{
                                fontFamily: "SFProBold",
                                fontSize: scaleFont(12),
                                letterSpacing: scaleFont(1),
                                color: "#181818"
                            }}>{showPopupStep+1}</Text>
                            <Text style={{
                                fontFamily: "SFProBold",
                                fontSize: scaleFont(12),
                                letterSpacing: scaleFont(1),
                                color: "#5F5F5F99"
                            }}>/4</Text>
                        </View>
                        <PopupButton onPress={() => {
                            if(showPopupStep===3){
                                router.replace("/dashboard");
                                storage.set('dashboardpop', true);
                            }else{
                                setShowPopupStep(showPopupStep+1)
                            }
                        }} />
                    </View>
                </View>
                {steps[showPopupStep].pointer === "bottom" && steps[showPopupStep].content}
            </View>
        </>
    );
}
