import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text } from "react-native";
export default function Daily() {
    const { scaleFont } = useAuth();
    return (
        <>
            <LinearGradient
                colors={["#EBD2FE", "#FBB9DD"]}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{
                    borderRadius: scaleFont(25),
                    borderWidth: scaleFont(1),
                    borderColor: '#F8F8F8',
                    paddingHorizontal: scaleFont(8),
                    paddingTop: scaleFont(13),
                    paddingBottom: scaleFont(20),
                    alignItems: 'center',
                    flexDirection: "column",
                    marginTop: scaleFont(181),
                }}
            >
                <Image
                    style={{ width: scaleFont(70), height: scaleFont(74) }}
                    source={require('@/assets/images/login/sphere.png')}
                />
                <Text style={{
                    fontFamily: 'SFPro',
                    fontWeight: "900",
                    fontSize: scaleFont(16),
                    color: '#181818',
                    marginTop: scaleFont(8),
                }}>
                    Daily Advice from AI Coach
                </Text>
                <Text style={{
                    fontFamily: 'SFProMedium',
                    fontSize: scaleFont(14),
                    color: '#5F5F5F',
                    lineHeight: scaleFont(16.8),
                    textAlign: "center",
                    marginTop: scaleFont(8)
                }}>
                    I think you’d really enjoy and get a lot out of Hold Me Tight by Dr.Sue Johnson. 
                    It aligns well with the work we’re doing and offers powerful insight into relationship patterns and emotional connection.
                </Text>
            </LinearGradient>
        </>
    )
}