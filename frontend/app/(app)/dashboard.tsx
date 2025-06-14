import Daily from '@/components/Dashboard/Daily';
import Emotion from '@/components/Dashboard/Emotion';
import Flow from '@/components/Dashboard/Flow';
import Name from '@/components/Dashboard/Name';
import Overall from '@/components/Dashboard/Overall';
import Tab from '@/components/Dashboard/Tab';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { View } from 'react-native';
export default function Dashboard() {
    const { scaleFont, user } = useAuth();
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false} showTopBar={true} current={0} firstbg="#FFFFFF" secondbg="#FFFFFF">
                <Name />
                <View style={{
                    paddingHorizontal: scaleFont(16),
                }}>
                    <Daily />
                    <Overall />
                    <Flow />
                    <Emotion />
                    <Tab />
                </View>
            </MainLayout >
        </>
    );
}
