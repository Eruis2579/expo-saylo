import { useAuth } from "@/context/AuthContext";
import { Image, Pressable, View } from "react-native";

export default function BarPopup({ current }: { current: number }) {
    const { scaleFont } = useAuth();
    const cancelButton = {
        icon: require('@/assets/images/aicoach/back.png'),
        onPress: () => { },
        onTouchStart: () => { },
        onTouchEnd: () => { },
        width: scaleFont(24),
        height: scaleFont(24),
        id: "cancel"
    }
    const mainButtons = [
        {
            icon: require('@/assets/images/aicoach/recording_init.png'),
            onPress: () => { },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(54),
            height: scaleFont(54),
        },
        {
            icon: require('@/assets/images/aicoach/popup_recordinginit.png'),
            onPress: () => { },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(54),
            height: scaleFont(54),
        },
        {
            icon: require('@/assets/images/aicoach/popup_recordinginit.png'),
            onPress: () => { },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(54),
            height: scaleFont(54),
        }
    ];
    const confirmButtons = [
        {
            icon: require('@/assets/images/aicoach/text_init.png'),
            onPress: () => { },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(24),
            height: scaleFont(24),
        },
        {
            icon: require('@/assets/images/aicoach/text_hover.png'),
            onPress: () => { },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(24),
            height: scaleFont(24),
        },
        {
            icon: require('@/assets/images/aicoach/complete.png'),
            onPress: () => { },
            onTouchStart: () => { },
            onTouchEnd: () => { },
            width: scaleFont(24),
            height: scaleFont(24),
        }
    ];
    return (
        <View style={{
            justifyContent: "center",
            flexDirection:"row",
            marginTop: scaleFont(19)
        }}>
            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: scaleFont(50),
                borderWidth: scaleFont(1),
                borderColor: "#F8F8F8",
                width: scaleFont(236),
                height: scaleFont(78),
                alignItems: 'center',
                justifyContent: "center",
                flexDirection: 'row',
                gap: scaleFont(35),
            }}>
                {[
                    cancelButton,
                    mainButtons[current],
                    confirmButtons[current]
                ].map((button, index) => (
                    <Pressable
                        key={index}
                        onPress={button.onPress}
                        onTouchStart={button.onTouchStart}
                        onTouchEnd={button.onTouchEnd}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={button.icon}
                            style={{
                                width: button.width,
                                height: button.height,
                            }}
                        />
                    </Pressable>
                ))}

            </View>

        </View>
    )
}