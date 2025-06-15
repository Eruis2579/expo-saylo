import MainLayout from '@/components/MainLayout';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Dimensions, Modal, Platform, Text, ToastAndroid, View } from "react-native";
import { ConfirmButton } from "../../components/Buttons/Confirm";
import GradientInput from "../../components/Input/GradientInput";
import { useAuth } from "../../context/AuthContext";
export default function Info() {
    const { scaleFont,signIn } = useAuth();
    const router = useRouter();
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [waiting, setWaiting] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        firstName: '',
    })

    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            if (selectedDate) setDate(selectedDate);
            setShow(false);
        }
        if (selectedDate) setDate(selectedDate);
    };
    const showToast = (text:string) => {
            if (Platform.OS === 'android') {
                ToastAndroid.show(text, ToastAndroid.SHORT);
            }else{
                alert(text);
            }
          };
    return (
        <>
            <MainLayout showHeader={true} showFooter={false} showbar={false}>
                <View style={{
                    marginTop: scaleFont(32),
                    flexDirection: 'column',
                    paddingLeft: scaleFont(16),
                    paddingRight: scaleFont(16),
                    justifyContent: 'space-between',
                    minHeight: Dimensions.get('window').height - scaleFont(163),
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
                            Tell us a little about yourself
                        </Text>
                        <View style={{
                            marginTop: scaleFont(32),
                        }}>
                            <GradientInput
                                name="Your First Name"
                                placeholder="Your First Name"
                                id="firstName"
                                value={data.firstName || ""}
                                onChangeText={(text) => setData({ ...data, firstName: text })}
                            />
                            <GradientInput
                                name="Your Bithday"
                                placeholder="Your Bithday"
                                id="birthday"
                                value={dayjs(date).format('D MMMM YYYY')}
                                style={{
                                    marginTop: scaleFont(16),
                                }}
                                onFocus={() => {
                                    if(!show) setShow(true)
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
                                        display="spinner"
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
                            axios.post('/auth/google/signup', {
                                realname: data.firstName,
                                birthday: dayjs(date).format('D MMMM YYYY'),
                            }).then(res => {
                                showToast("Signup Success");
                                signIn(res.data);
                                setWaiting(false);
                                router.replace('/partner')
                            }).catch(err => {
                                setWaiting(false);
                                showToast(err?.response?.data|| "Server error");
                            })
                        }}
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