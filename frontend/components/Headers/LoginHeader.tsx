import { useRouter } from "expo-router";
import { Image, Pressable } from "react-native";
import { useAuth } from "../../context/AuthContext";
export function LoginHeader() {
    const { scaleFont } = useAuth();
    const router = useRouter();
    return <>
        <Pressable onPress={()=>{router.replace('/signup')}} >
            <Image
                source={require('@/assets/images/logo/logo.png')}
                style={{
                    width: scaleFont(85),
                    height: scaleFont(36),
                }}
            />
        </Pressable>
    </>
}
