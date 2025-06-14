import { useAuth } from "@/context/AuthContext";
import { Text, View } from "react-native";
export default function Name() {
    const { scaleFont, user } = useAuth();
    return (
        <>
            <View style={{
                marginTop: scaleFont(24),
                paddingHorizontal: scaleFont(16),
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: 'SFProSemiBold',
                    fontSize: scaleFont(28),
                    color: '#181818',
                    lineHeight: scaleFont(34.6),
                }}>
                    Hello&nbsp;
                </Text>
                <Text style={{
                    fontFamily: 'SFProRoundedSemiBold',
                    fontSize: scaleFont(28),
                    color: '#181818',
                    lineHeight: scaleFont(34.6),
                }}>
                    {user?.realname}!
                </Text>
            </View>
        </>
    )
}