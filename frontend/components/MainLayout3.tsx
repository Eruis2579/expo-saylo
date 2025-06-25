import { LoginFooter } from "@/components/Footers/LoginFooter";
import { Bar } from "@/components/Headers/Bar";
import { LoginHeader } from "@/components/Headers/LoginHeader";
import TopBar from "@/components/Headers/TopBar";
import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, Dimensions, Platform, ScrollView, View } from "react-native";
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
    paddingBottom = 24,
    showSkip = false,
    onSkip = () => { },
    backgroundFadeAnim
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
    showSkip?: boolean,
    onSkip?: () => void,
    backgroundFadeAnim: any
}) {
    const { scaleFont } = useAuth();
    return <>
        <Animated.View style={{
            opacity: backgroundFadeAnim,
        }}>
            <LinearGradient
                colors={[firstbg, secondbg]}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: Dimensions.get('window').height,
                }}
            >
                <View></View>
            </LinearGradient>
        </Animated.View>

        {
            Platform.OS === 'web' ?
                <View style={{
                    paddingTop: scaleFont(71),
                    paddingBottom: scaleFont(paddingBottom),
                }}>
                    <View style={{
                        minHeight: Dimensions.get('window').height - scaleFont(71 + paddingBottom),
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
                                {showSkip && <SkipButton onchange={onSkip} />}
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
                            minHeight: Dimensions.get('window').height - scaleFont(71 + paddingBottom),
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
                                    {showSkip && <SkipButton onchange={onSkip} />}
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
    </>;
}