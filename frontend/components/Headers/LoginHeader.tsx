import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import LoginLogo from "../../assets/images/logo/login.svg";
import { useAuth } from "../../context/AuthContext";
export function LoginHeader() {
    const { scaleFont } = useAuth();
    const router = useRouter();
    return <>
        <Pressable onPress={()=>{router.replace('/signup')}} >
            <LoginLogo style={{
                width: scaleFont(85),
                height: scaleFont(36),
            }} />
        </Pressable>
    </>
}
