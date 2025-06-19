import MainLayout from '@/components/MainLayout';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, KeyboardAvoidingView, Modal, Platform, Text, ToastAndroid, View } from "react-native";
import { ConfirmButton } from "../../components/Buttons/Confirm";
import GradientInput from "../../components/Input/GradientInput";
import { useAuth } from "../../context/AuthContext";
export default function Info() {
    const { scaleFont, user,signIn } = useAuth();
    const router = useRouter();
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [waiting, setWaiting] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        pfirstName: '',
        pbirthday: '',
    })
    if (user?.friend?.realname && user?.friend?.birthday) {
        router.replace('/relationone')
    }
    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            if (selectedDate) setDate(selectedDate);
            setShow(false);
        }
        if (selectedDate) setDate(selectedDate);
    };
    const showToast = (text: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(text, ToastAndroid.SHORT);
        } else {
            alert(text);
        }
    };
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 90} // adjust this if needed
                >
                    <View style={{
                        marginTop: scaleFont(32),
                        flexDirection: 'column',
                        paddingLeft: scaleFont(16),
                        paddingRight: scaleFont(16),
                        justifyContent: 'space-between',
                        flex: 1,
                    }}>
                        <View style={{
                            flexDirection: 'column',
                        }}>
                            <Text style={{
                                fontFamily: 'SFProSemiBold',
                                fontSize: scaleFont(32),
                                color: '#181818',
                                lineHeight: scaleFont(38.4),
                            }}>
                                Tell us a little about your partner
                            </Text>
                            <View style={{
                                marginTop: scaleFont(32),
                            }}>
                                <GradientInput
                                    name="Partner’s First Name"
                                    placeholder="Partner’s First Name"
                                    id="firstName"
                                    value={data.pfirstName || ""}
                                    onChangeText={(text) => setData({ ...data, pfirstName: text })}
                                />
                                <GradientInput
                                    name="Partner’s Birthday"
                                    placeholder="Partner’s Birthday"
                                    id="birthday"
                                    value={dayjs(date).format('D MMMM YYYY')}
                                    style={{
                                        marginTop: scaleFont(16),
                                    }}
                                    onFocus={() => {
                                        if (!show) setShow(true)
                                    }}
                                />
                                {show && (
                                    Platform.OS === 'ios' ? (
                                        <Modal transparent={true} animationType="slide" visible={show}>
                                            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000040' }}>
                                                <View style={{ backgroundColor: 'white', padding: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                                    <DateTimePicker
                                                        value={date}
                                                        mode="date"
                                                        display="spinner"
                                                        onChange={onChange}
                                                        maximumDate={new Date()}
                                                    />
                                                    <Button title="Done" onPress={() => setShow(false)} />
                                                </View>
                                            </View>
                                        </Modal>
                                    ) : (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="spinner" // Recommended for Android
                                            onChange={onChange}
                                            maximumDate={new Date()}
                                        />
                                    )
                                )}
                            </View>
                        </View>
                        <ConfirmButton
                            waiting={waiting}
                            onClick={() => {
                                setWaiting(true);
                                axios.put('/auth/updateFriend', {
                                    realname: data.pfirstName,
                                    birthday: dayjs(date).format('D MMMM YYYY'),
                                }).then(res => {
                                    signIn({
                                        ...user,
                                        friend: {
                                            ...user?.friend,
                                            realname: data.pfirstName,
                                            birthday: dayjs(date).format('D MMMM YYYY'),
                                        }
                                    } as any)
                                    showToast("Update Success");
                                    router.replace('/relationinit');
                                    setWaiting(false);
                                }).catch(err => {
                                    setWaiting(false);
                                    showToast(err?.response?.data || "Server error");
                                })
                            }}
                            title="Next"
                            style={{
                                marginTop: scaleFont(24),
                                gap: scaleFont(5)
                            }} />
                    </View>
                </KeyboardAvoidingView>
            </MainLayout>
        </>
    );
}