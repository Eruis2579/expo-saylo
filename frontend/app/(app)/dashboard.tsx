import Daily from '@/components/Dashboard/Daily';
import Flow from '@/components/Dashboard/Flow';
import Name from '@/components/Dashboard/Name';
import Overall from '@/components/Dashboard/Overall';
import Tab from '@/components/Dashboard/Tab';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/utils/localstorage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
export default function Dashboard() {
    const { scaleFont, user } = useAuth();
    useEffect(()=>{
        async function checkPopup(){
            if(await storage.get('dashboardpop')!==true){
                router.replace('/dashboardpopup' as any)
            }
        }
        checkPopup()
    },[])
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false} showTopBar={true} current={0} firstbg="#FFFFFF" secondbg="#FFFFFF" paddingBottom={31}>
                <Name />
                <View style={{
                    justifyContent:"space-between",
                    paddingHorizontal: scaleFont(16),
                    minHeight:Dimensions.get('window').height - scaleFont(196.6),
                }}>
                    <View>
                        <Daily />
                        <Overall />
                        <Flow />
                    </View>
                    <Tab current={0} />
                </View>
            </MainLayout >
        </>
    );
}
