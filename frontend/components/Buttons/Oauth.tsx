import React from "react";
import { Image, Pressable, StyleProp, Text, ViewStyle } from "react-native";
import { useAuth } from "../../context/AuthContext";
export function OauthButton({ title, style, onClick, icon, waiting }: { title: string, style?: StyleProp<ViewStyle>, onClick?: () => void, icon: string, waiting?: boolean }) {
    const { scaleFont } = useAuth();
    const icons: Record<string, any> = {
        apple: require('@/assets/images/login/apple.png'),
        google: require('@/assets/images/login/google.png'),
    };
    const waitingIcons: Record<string, any> = {
        apple: require('@/assets/images/login/apple.png'),
        google: require('@/assets/images/waiting.gif'),
    };
    return (
        <>
            <Pressable
                disabled={waiting}
                onPress={onClick}
                style={[
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: "auto",
                        gap: scaleFont(16),
                        width: scaleFont(333),
                        height: scaleFont(56),
                        padding: scaleFont(16),
                        backgroundColor: '#FFFFFF',
                        borderRadius: scaleFont(10),
                        borderWidth: scaleFont(1),
                        borderColor: '#F8F8F8',
                        ...(waiting ? { justifyContent: "center" } : {})
                    },
                    style
                ]}
            >
                <Image
                    source={waiting ? waitingIcons[icon] : icons[icon]}
                    style={{
                        width: scaleFont(24),
                        height: scaleFont(24),
                    }}
                    resizeMode="contain"
                />
                {
                    !waiting && (
                        <Text style={{
                            fontFamily: 'SFProMedium',
                            fontSize: scaleFont(16),
                            color: '#59606E',
                            lineHeight: scaleFont(25.6),
                        }}>
                            {title}
                        </Text>
                    )
                }
            </Pressable>
        </>
    );
}