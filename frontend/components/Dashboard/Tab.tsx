import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
export default function Tab({ style, current = 2, coachLink = '/aicoach' }: { style?: any, current?: number, coachLink?: string }) {
    const { scaleFont } = useAuth();

    const tabList = [
        {
            buttonWidth: scaleFont(42),
            buttonHeight: scaleFont(42),
            imageWidth: scaleFont(24),
            imageHeight: scaleFont(24),
            imageSourceNormal: require(`@/assets/images/newtab/home.png`),
            imageSourceActive: require(`@/assets/images/newtab/home-active.png`),
            href: '/dashboard'
        },
        {
            buttonWidth: scaleFont(42),
            buttonHeight: scaleFont(42),
            imageWidth: scaleFont(24),
            imageHeight: scaleFont(24),
            imageSourceNormal: require(`@/assets/images/newtab/note.png`),
            imageSourceActive: require(`@/assets/images/newtab/note-active.png`),
            href: '/dashboard'
        },
        {
            buttonWidth: scaleFont(49),
            buttonHeight: scaleFont(51),
            imageWidth: scaleFont(49),
            imageHeight: scaleFont(51),
            imageSourceNormal: require(`@/assets/images/newtab/coach.png`),
            imageSourceActive: require(`@/assets/images/newtab/coach-active.png`),
            href: coachLink
        },
        {
            buttonWidth: scaleFont(42),
            buttonHeight: scaleFont(42),
            imageWidth: scaleFont(24),
            imageHeight: scaleFont(24),
            imageSourceNormal: require(`@/assets/images/newtab/progress.png`),
            imageSourceActive: require(`@/assets/images/newtab/progress-active.png`),
            href: '/dashboard'
        },
        {
            buttonWidth: scaleFont(42),
            buttonHeight: scaleFont(42),
            imageWidth: scaleFont(24),
            imageHeight: scaleFont(24),
            imageSourceNormal: require(`@/assets/images/newtab/chat.png`),
            imageSourceActive: require(`@/assets/images/newtab/chat-active.png`),
            href: '/chat'
        }
    ]
    return (
        <>
            <View style={{
                shadowColor: "#E1E1E1",
                shadowOffset: {
                    width: 0,
                    height: scaleFont(2),
                },
                shadowOpacity: 0.25,
                shadowRadius: scaleFont(4),
                elevation: scaleFont(5),
                backgroundColor: "#FFFFFF",
                borderRadius: scaleFont(30),
                ...style
            }}>
                <View style={{
                    height: scaleFont(59),
                    width: scaleFont(343),
                    borderRadius: scaleFont(30),
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: scaleFont(16),
                    shadowColor: "#E1E1E1",
                    shadowOffset: {
                        width: 0,
                        height: scaleFont(-2),
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: scaleFont(4),
                    elevation: scaleFont(5),
                    backgroundColor: "#FFFFFF"
                }}>
                    {tabList.map((item, index) => {
                        return (
                            <Pressable key={index} style={{
                                width: item.buttonWidth,
                                height: item.buttonHeight,
                                alignItems: "center",
                                justifyContent: "center",

                            }} onPress={() => { router.replace(item.href as any) }}>
                                {index === current ? <Image
                                    style={{ width: item.imageWidth, height: item.imageHeight }}
                                    source={item.imageSourceActive} /> : <Image
                                    style={{ width: item.imageWidth, height: item.imageHeight }}
                                    source={item.imageSourceNormal} />}
                            </Pressable>
                        )
                    })}
                </View>
            </View>
        </>
    )
}