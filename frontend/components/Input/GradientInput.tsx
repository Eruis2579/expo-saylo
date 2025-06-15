import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleProp, Text, TextInput, View, ViewStyle } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function GradientInput({
    name,
    placeholder,
    id,
    style,
    onFocus,
    value,
    onChangeText,
}: {
    name: string;
    placeholder: string;
    id: string;
    style?: StyleProp<ViewStyle>;
    onFocus?: () => void;
    value?: string;
    onChangeText?: (e: any) => void;
}) {
    const { scaleFont } = useAuth();

    return (
        <View style={style}>
            <Text
                style={{
                    fontFamily: 'SFProMedium',
                    fontSize: scaleFont(14),
                    color: '#181818',
                    lineHeight: scaleFont(22.4),
                    paddingHorizontal: scaleFont(16),
                }}
            >
                {name}
            </Text>

            <LinearGradient
                colors={['#fbd3e9', '#fdfbfb']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={
                    {
                        marginTop: scaleFont(6),
                        borderRadius: scaleFont(10),
                        padding: scaleFont(1.5), // Border width
                    }
                }
            >
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: scaleFont(10),
                    }}
                >
                    <TextInput
                        onTouchStart={onFocus}
                        onFocus={onFocus}
                        selectionColor="#FBB9DD"
                        id={id}
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor="#5F5F5F"
                        style={{
                            borderRadius: scaleFont(10),
                            paddingVertical: scaleFont(12),
                            paddingHorizontal: scaleFont(16),
                            fontFamily: 'SFProMedium',
                            fontSize: scaleFont(14),
                            color: '#5F5F5F',
                            padding: 0,
                        }}
                    />
                </View>
            </LinearGradient>
        </View>
    );
}
