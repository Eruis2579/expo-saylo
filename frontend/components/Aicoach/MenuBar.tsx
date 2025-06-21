import { useAuth } from "@/context/AuthContext";
import { BlurView } from 'expo-blur';
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
export default function ({ style }: { style: any }) {
    const { scaleFont } = useAuth()
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
                    shadowColor: "#E1E1E1",
                    shadowOffset: {
                        width: 0,
                        height: scaleFont(-2),
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: scaleFont(4),
                    elevation: scaleFont(5),
                    backgroundColor: "#FFFFFF",
                    borderRadius: scaleFont(30),
                    width: scaleFont(188),
                    height: scaleFont(59),
                    alignItems: "center",
                    justifyContent: "center",
                    gap: scaleFont(16),
                    flexDirection: "row",
                }}>
                    <Pressable style={{
                        width: scaleFont(42),
                        height: scaleFont(42),
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: scaleFont(21),
                        backgroundColor: "#FFFFFF",
                        borderWidth: scaleFont(1),
                        borderColor: "#F8F8F8",
                        shadowColor: "#E1E1E1",
                        shadowOffset: {
                            width: 0,
                            height: scaleFont(2),
                        },
                        shadowOpacity: 0.17,
                        shadowRadius: scaleFont(2),
                        elevation: scaleFont(3),
                    }} onPress={() => { router.replace('/dashboard') }}>
                        <Image
                            style={{ width: scaleFont(24), height: scaleFont(24) }}
                            source={require('@/assets/images/aicoach/home.png')} />
                    </Pressable>

                    <Pressable
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}
                        onPress={() => {
                            console.log('Homewwww');
                        }}
                    >
                        <View style={{ position: 'relative' }}>
                            <BlurView
                                intensity={50}
                                tint="light"
                                style={{
                                    width: scaleFont(49.2),
                                    height: scaleFont(51.6),
                                    borderRadius: scaleFont(49.2 / 2),
                                }}
                            />
                            <Image
                                source={require('@/assets/images/aicoach/small_sphere.png')}
                                style={{
                                    position: 'absolute',
                                    width: scaleFont(49.2),
                                    height: scaleFont(51.6),
                                }}
                            />
                        </View>
                    </Pressable>
                </View>
            </View>
        </>
    )
}