import Daily from '@/components/Dashboard/Daily';
import Flow from '@/components/Dashboard/Flow';
import Name from '@/components/Dashboard/Name';
import Overall from '@/components/Dashboard/Overall';
import Tab from '@/components/Dashboard/Tab';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Dimensions, View } from 'react-native';
export default function Dashboard() {
    const { scaleFont, user } = useAuth();
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false} showTopBar={true} current={0} firstbg="#FFFFFF" secondbg="#FFFFFF" paddingBottom={10}>
                <Name />
                <View style={{
                    justifyContent:"space-between",
                    paddingHorizontal: scaleFont(16),
                    minHeight:Dimensions.get('window').height - scaleFont(175.6),
                }}>
                    <View>
                        <Daily />
                        <Overall />
                        <Flow />
                    </View>
                    <Tab />
                </View>
            </MainLayout >
        </>
    );
}
