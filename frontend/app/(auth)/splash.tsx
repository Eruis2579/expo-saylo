import { useAuth } from "@/context/AuthContext";
import { useSplash } from "@/context/SplashContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, View } from "react-native";
export default function Splash() {
    const {scaleFont} = useAuth();
    const router = useRouter();
    const {splashState, setSplashState} = useSplash();
    useEffect(() => {
        if (splashState) {
            setTimeout(() => {
                setSplashState(false);
            }, 2000);
        }
        else {
            router.replace('/signup');
        }
    }, [splashState])
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
            <Image
                source={require('@/assets/images/splash_mark.png')}
                style={{
                    width: scaleFont(314.02),
                    height: scaleFont(108.52),
                }}
            />
        </View>
    )
}