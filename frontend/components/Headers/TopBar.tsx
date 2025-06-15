import User from "@/assets/images/dashboard/userinfo.svg";
import { View } from "react-native";
import { useAuth } from "../../context/AuthContext";
export default function TopBar() {
    const { scaleFont, user } = useAuth();
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleFont(8),
        }}>
            <View style={{
                width: scaleFont(32),
                height: scaleFont(32),
                borderRadius: scaleFont(8),
                borderWidth:scaleFont(1),
                borderColor:"#F8F8F8",
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: "#E1E1E1",
                shadowOffset: {
                    width:scaleFont(2),
                    height: scaleFont(2),
                },
                shadowOpacity: 0.17,
                shadowRadius: scaleFont(4),
                elevation: scaleFont(5),
            }}>
                <User style={{
                    width: scaleFont(16),
                    height: scaleFont(16),
                }} />
            </View>
        </View>
    )
}