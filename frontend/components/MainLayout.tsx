import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, View } from "react-native";
import { LoginFooter } from "./Footers/LoginFooter";
import { Bar } from "./Headers/Bar";
import { LoginHeader } from "./Headers/LoginHeader";
import TopBar from "./Headers/TopBar";
export default function MainLayout({
    children,
     showHeader = true,
     showFooter = true,
     showbar = false,
     current = 0,
     showTopBar = false,
     firstbg="#FBF1FE",
     secondbg="#FFEAF5"
}: {
    children: React.ReactNode,
    showHeader: boolean,
    showFooter: boolean,
    showbar?: boolean,
    current?: number,
    showTopBar?: boolean,
    firstbg?: string,
    secondbg?: string
}) {
    const { scaleFont } = useAuth();
    return <>
        <LinearGradient
            colors={[firstbg, secondbg]}
            style={{
                flex: 1,
                overflowY: 'auto',
                height: Dimensions.get('window').height,
            }}
        >
            <View style={{
                paddingTop: scaleFont(71),
                paddingBottom: scaleFont(24),
                minHeight: Dimensions.get('window').height,
            }}>

                {
                    showHeader && <View style={{
                        paddingHorizontal: scaleFont(16),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',

                    }}>
                        <LoginHeader />
                        {showbar && <Bar current={current} />}
                        {showTopBar && <TopBar />}
                    </View>
                }
                {children}
                {
                    showFooter && <LoginFooter />
                }
            </View>
        </LinearGradient>
    </>;
}