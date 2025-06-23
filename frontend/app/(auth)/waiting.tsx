import { useAuth } from "@/context/AuthContext";
import { Image, View } from "react-native";
export default function(){
    const {scaleFont} = useAuth();
    return(
        <>
            <View style={{
                position:"absolute",
                width:scaleFont(375),
                height:scaleFont(872),
                backgroundColor:"#000000aa",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <Image 
                    source={require('@/assets/images/loading.gif')}
                    width={scaleFont(150)}
                    height={scaleFont(150)} 
                />
            </View>
        </>
    )
}