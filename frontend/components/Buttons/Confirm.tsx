import React from "react";
import { Image, Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { useAuth } from "../../context/AuthContext";
import GradientButton from "./Gradient";
export function ConfirmButton({ title, style, onClick, waiting = false }: { title: string, style?: StyleProp<ViewStyle>, onClick?: () => void, waiting?: boolean }) {
    const [isHover, setIsHover] = React.useState(false);
    const { scaleFont } = useAuth();
    return (
        <>
            <Pressable
                onTouchStart={() => {!waiting&&setIsHover(true)}}
                onTouchEnd={() => {isHover&&setIsHover(false)}}
                onPress={onClick}
                disabled={waiting}
                style={[
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: "auto",
                        gap:scaleFont(5)
                    },
                    style
                ]}
            >
                <View style={{
                    width: scaleFont(279),
                    height: scaleFont(48),
                    backgroundColor: '#FFFFFF',
                    borderRadius: scaleFont(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: scaleFont(1),
                    borderColor: '#F8F8F8'
                }}>
                    {
                        waiting ? (
                            <Image
                                source={require('@/assets/images/waiting.gif')}
                                style={{ 
                                    width: scaleFont(48), 
                                    height: scaleFont(48) }}
                            />
                        ) : (
                            <Text style={{
                                fontFamily: 'SFProSemiBold',
                                fontSize: scaleFont(16),
                                color: '#181818',
                            }}>
                                {title}
                            </Text>
                        )
                    }
                </View>
                <GradientButton isHover={isHover} />
            </Pressable>
        </>
    );
}