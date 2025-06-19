import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
export default function Tab() {
    const { scaleFont } = useAuth();
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
                borderRadius: scaleFont(30)
            }}>
                <View style={{
                    marginTop: scaleFont(9),
                    height:scaleFont(59),
                    borderRadius: scaleFont(30),
                    flexDirection: "row",
                    gap: scaleFont(16),
                    justifyContent: "center",
                    alignItems: "center",
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
                    <Pressable style={{
                        width: scaleFont(42),
                        height: scaleFont(42),
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Image
                            style={{ width: scaleFont(24), height: scaleFont(24) }}
                            source={require('@/assets/images/newtab/home.png')} />
                    </Pressable>
                    <Pressable style={{
                        width: scaleFont(42),
                        height: scaleFont(42),
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Image
                            style={{ width: scaleFont(24), height: scaleFont(24) }}
                            source={require('@/assets/images/newtab/note.png')} />
                    </Pressable>
                    <Pressable style={{
                        width: scaleFont(49),
                        height: scaleFont(51),
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Image
                            style={{ width: scaleFont(49), height: scaleFont(51) }}
                            source={require('@/assets/images/newtab/coach.png')} />
                    </Pressable>
                    <Pressable style={{
                        width: scaleFont(42),
                        height: scaleFont(42),
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Image
                            style={{ width: scaleFont(24), height: scaleFont(24) }}
                            source={require('@/assets/images/newtab/progress.png')} />
                    </Pressable>
                    <Pressable style={{
                        width: scaleFont(42),
                        height: scaleFont(42),
                        alignItems: "center",
                        justifyContent: "center",
                    }} onPress={() => {router.replace('/chat')}}>
                        <Image
                            style={{ width: scaleFont(24), height: scaleFont(24) }}
                            source={require('@/assets/images/newtab/chat.png')} />
                    </Pressable>
                </View>
            </View>
        </>
    )
}