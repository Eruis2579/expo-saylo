import { Text } from "react-native";
import { useAuth } from "../../context/AuthContext";
export function LoginFooter() {
    const { scaleFont } = useAuth();
    return (
        <Text style={{
            marginTop: scaleFont(67),
            maxWidth:scaleFont(266),
            marginHorizontal:"auto",
            textAlign: 'center',
            fontFamily: 'SFPro',
            fontSize: scaleFont(12),
            fontWeight: "normal",
            color: '#5F5F5F',
            lineHeight: scaleFont(14.4),
          }}>
            By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
    )
}