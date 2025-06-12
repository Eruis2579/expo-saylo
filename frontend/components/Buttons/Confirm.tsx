import React from "react";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import { useAuth } from "../../context/AuthContext";
import GradientButton from "./Gradient";
export function ConfirmButton({ title, style, onClick }: { title: string, style?: StyleProp<ViewStyle>, onClick?: () => void }) {
    const [isHover, setIsHover] = React.useState(false);
    const { scaleFont } = useAuth();
    return (
        <>
            <Pressable
                onTouchStart={() => setIsHover(true)}
                onTouchEnd={() => setIsHover(false)}
                onPress={onClick}
                style={[
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: "auto"
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
                    <Text style={{
                        fontFamily: 'SFProSemiBold',
                        fontSize: scaleFont(16),
                        color: '#181818',
                    }}>
                        {title}
                    </Text>
                </View>
                <GradientButton isHover={isHover} />
            </Pressable>
        </>
    );
}