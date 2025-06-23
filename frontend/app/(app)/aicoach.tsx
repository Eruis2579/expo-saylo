import SelfChatBar from "@/components/Aicoach/SelfChatBar";
import SelfContentList from "@/components/Aicoach/SelfContentList";
import Tab from "@/components/Dashboard/Tab";
import MainLayout2 from "@/components/MainLayout2";
import { useAuth } from "@/context/AuthContext";
import { useWaiting } from "@/context/WaitingContext";
import { showToast } from "@/utils/showToast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function Qone() {
    const { scaleFont, user, signIn } = useAuth();
    const [screenStatus, setScreenStatus] = useState({
        mainStatus: 0,
        confirmStatus: 0,
        messageStatus: 0,
        contentStatus: 0,
    })
    const {setWaiting, delWaiting} = useWaiting();
    const [messageList, setMessageList] = useState({
        0: "",
        1: "Let's talk",
        2: "",
        3: "Tell me more about yours releationship.",
    })
    const onCancelFunc =()=> {
        setScreenStatus({ mainStatus: 0, confirmStatus: 0, messageStatus: 0, contentStatus: 0 })
    }
    useEffect(() => {
        if (screenStatus.mainStatus === 2 && messageList[0].trim().length > 0) {
            if (screenStatus.confirmStatus !== 2) {
                setScreenStatus({ ...screenStatus, confirmStatus: 2 })
            }
        } else {
            if (screenStatus.confirmStatus === 2) {
                setScreenStatus({ ...screenStatus, confirmStatus: 1 })
            }
        }
    }, [messageList])
    const onConfirm = () => {
        setWaiting("global");
        axios.post('/coach/self/chat', {
            content: messageList[0],
        })
            .then(res => {
                delWaiting("global");
                setMessageList({
                    ...messageList,
                    [0]:"",
                    [2]: res.data,
                })
                setScreenStatus({ mainStatus: 0, confirmStatus: 0, messageStatus: 2, contentStatus: 2 })
            })
            .catch(err => {
                delWaiting("global");
                showToast(err?.response?.data || "Server error");
            })
    }
    return (
        <>
            <MainLayout2 showHeader={true} showFooter={false} showbar={false} showTopBar={false} current={0} bg="aicoach.png" paddingBottom={31}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust this if needed
                >
                    <View style={{
                        marginTop: scaleFont(48),
                        paddingHorizontal: scaleFont(16),
                        flex: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            flexDirection: "column",
                            alignItems: 'center',
                        }}>
                            <View style={{
                                alignItems: 'center',
                                maxWidth: scaleFont(295),
                            }}>
                                <Text style={{
                                    fontFamily: 'SFProMedium',
                                    fontSize: scaleFont(32),
                                    color: '#5F5F5F',
                                    textAlign: "center"
                                }}>
                                    Hey {user?.realname || "Sarah"},
                                </Text>
                                <Text style={{
                                    marginTop: scaleFont(8),
                                    fontFamily: 'SFProMedium',
                                    fontSize: screenStatus.messageStatus === 2 ? scaleFont(18) : scaleFont(32),
                                    color: '#181818',
                                    lineHeight: screenStatus.messageStatus === 2 ? scaleFont(21.6) : scaleFont(38.4),
                                    textAlign: "center"
                                }}>
                                    {messageList[screenStatus.messageStatus as keyof typeof messageList]}
                                </Text>
                            </View>
                            <SelfContentList current={screenStatus.contentStatus} textData={messageList[0]} setTextData={(text) => { setMessageList({ ...messageList, [0]: text }) }} />
                        </View>
                        <View style={{
                            alignItems: "center"
                        }}>
                            <SelfChatBar
                                onCancel={onCancelFunc}
                                mainStatus={screenStatus.mainStatus}
                                confirmStatus={screenStatus.confirmStatus}
                                showCancel={screenStatus.contentStatus !== 0}
                                setScreenStatus={setScreenStatus}
                                setMessageList={setMessageList}
                                messageList={messageList}
                                onConfirm={onConfirm}
                            />
                            <Tab style={{
                                marginTop:scaleFont(42)
                            }} current={2} coachLink="/chat" />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </MainLayout2>
        </>
    )
}