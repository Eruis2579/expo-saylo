import { useState } from "react";
import { Pressable } from "react-native";
import GradientButton from "./Gradient";

export default function ({ onPress }: { onPress?: () => void }) {
    const [isHover, setisHover] = useState(false)
    return (
        <>

            <Pressable
                onTouchStart={() => {
                    setisHover(true)
                }}
                onTouchEnd={() => {
                    setisHover(false)
                }}
                onPress={onPress}
            >
                <GradientButton isHover={isHover} />
            </Pressable>
        </>
    )
}