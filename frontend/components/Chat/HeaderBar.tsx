import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function HeaderBar() {
    const { scaleFont,user } = useAuth();
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: scaleFont(16),
            backgroundColor: '#FFFFFF',
            height: scaleFont(54),
        }}>
            <Pressable onPress={() => router.replace('/dashboard')}>
                <View style={{
                    width: scaleFont(42),
                    height: scaleFont(42),
                    borderRadius: scaleFont(8),
                    borderWidth: scaleFont(1),
                    borderColor: "#F8F8F8",
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: "#E1E1E1",
                    shadowOffset: {
                        width: scaleFont(0),
                        height: scaleFont(0),
                    },
                    shadowOpacity: 0.17,
                    shadowRadius: scaleFont(4),
                    elevation: scaleFont(5),
                }}>
                    <Image
                        source={require('@/assets/images/chat/home.png')}
                        style={{
                            width: scaleFont(24),
                            height: scaleFont(24),
                        }}
                    />
                </View>
            </Pressable>
            <Text style={{
                fontFamily: 'SFProSemiBold',
                fontSize: scaleFont(18),
                color: '#181818',
                textTransform: 'uppercase',
            }}>{user?.friend?.realname}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scaleFont(22.64),
            }}>
                <Pressable>
                    <Image
                        source={require('@/assets/images/chat/video.png')}
                        style={{
                            width: scaleFont(22.72),
                            height: scaleFont(16.25),
                        }}
                    />
                </Pressable>
                <Pressable>
                    <Image
                        source={require('@/assets/images/chat/call.png')}
                        style={{
                            width: scaleFont(18.36),
                            height: scaleFont(17.39),
                        }}
                    />
                </Pressable>
            </View>
        </View>
    );
}