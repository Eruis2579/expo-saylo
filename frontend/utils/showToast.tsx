import { Platform, ToastAndroid } from "react-native";
export const showToast = (text: string) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    } else {
        alert(text);
    }
};