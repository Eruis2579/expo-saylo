import { LoginFooter } from "@/components/Footers/LoginFooter";
import { Bar } from "@/components/Headers/Bar";
import { LoginHeader } from "@/components/Headers/LoginHeader";
import TopBar from "@/components/Headers/TopBar";
import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Platform, ScrollView, View } from "react-native";
import { SkipButton } from "./Buttons/Skip";
export default function MainLayout({
    children,
    showHeader = true,
    showFooter = true,
    showbar = false,
    current = 0,
    showTopBar = false,
    firstbg = "#FBF1FE",
    secondbg = "#FFEAF5",
    paddingBottom=24,
    showSkip = false,
    onSkip = () => {},
}: {
    children: React.ReactNode,
    showHeader: boolean,
    showFooter: boolean,
    showbar?: boolean,
    current?: number,
    showTopBar?: boolean,
    firstbg?: string,
    secondbg?: string,
    paddingBottom?: number,
    showSkip?:boolean   ,
    onSkip?: () => void
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
            {
                Platform.OS === 'web' ?
                    <View style={{
                        paddingTop: scaleFont(71),
                        paddingBottom: scaleFont(paddingBottom),
                    }}>
                        <View style={{
                            minHeight: Dimensions.get('window').height - scaleFont(71+paddingBottom),
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
                                    {showSkip&&<SkipButton onchange={onSkip} />}
                                </View>
                            }
                            {children}
                            {
                                showFooter && <LoginFooter />
                            }
                        </View>
                    </View> :
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                        <View style={{
                            paddingTop: scaleFont(71),
                            paddingBottom: scaleFont(paddingBottom),
                        }}>
                            <View style={{
                                minHeight: Dimensions.get('window').height - scaleFont(71+paddingBottom),
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
                                        {showSkip&&<SkipButton onchange={onSkip} />}
                                    </View>
                                }
                                {children}
                                {
                                    showFooter && <LoginFooter />
                                }
                            </View>
                        </View>
                    </ScrollView>
            }
        </LinearGradient>
    </>;
}