import { useAuth } from "@/context/AuthContext";
import { Dimensions, ImageBackground, Platform, ScrollView, View } from "react-native";
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
    bg = ""
}: {
    children: React.ReactNode,
    showHeader: boolean,
    showFooter: boolean,
    showbar?: boolean,
    current?: number,
    showTopBar?: boolean,
    bg?: string
}) {
    const { scaleFont } = useAuth();
    return <>
        <ImageBackground
            source={require('../assets/images/aicoach/aicoach.png')}
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                flex: 1,
                overflowY: 'auto',
            }}
        >
                {
                    Platform.OS === 'web' ?
                        <View style={{
                            paddingTop: scaleFont(71),
                            paddingBottom: scaleFont(24),
                        }}>
                            <View style={{
                                minHeight: Dimensions.get('window').height - scaleFont(95),
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
                        </View> :
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{
                                paddingTop: scaleFont(71),
                                paddingBottom: scaleFont(24),
                            }}>
                                <View style={{
                                    minHeight: Dimensions.get('window').height - scaleFont(95),
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
                            </View>
                        </ScrollView>
                }
        </ImageBackground>
    </>;
}