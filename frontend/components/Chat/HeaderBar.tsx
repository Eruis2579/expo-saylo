import dayjs from "dayjs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
export default function HeaderBar({ partnerOnline, partnerLastOnlineAt }: { partnerOnline: boolean, partnerLastOnlineAt: any }) {
    const { scaleFont, user } = useAuth();
    const [lastOnlineAt, setLastOnlineAt] = useState("");
    const setLastOnlineAtString = () => {
        setLastOnlineAt(partnerLastOnlineAt ? "(" + dayjs().diff(dayjs(partnerLastOnlineAt), 'minutes') + " minutes ago)" : "");
    }
    useEffect(() => {
        setLastOnlineAtString();
        const id = setInterval(setLastOnlineAtString, 60000);
        return () => clearInterval(id);
    }, [partnerLastOnlineAt])
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
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                gap: scaleFont(2),
            }}>
                <Text style={{
                    fontFamily: 'SFProSemiBold',
                    fontSize: scaleFont(18),
                    color: '#181818',
                    textTransform: 'uppercase',
                }}>{user?.friend?.realname}</Text>
                <Text style={{
                    fontFamily: 'SFProSemiBold',
                    fontSize: scaleFont(12),
                    color: '#181818',
                    textTransform: 'uppercase',
                }}>{partnerOnline ? "online" : lastOnlineAt}</Text>
            </View>
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