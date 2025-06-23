import { useAuth } from "@/context/AuthContext";
import { Image, View } from "react-native";
export default function(){
    const {scaleFont} = useAuth();
    return(
        <>
            <View style={{
                position:"absolute",
                width:scaleFont(375),
                height:scaleFont(812),
                backgroundColor:"#000000aa",
                justifyContent:"center",
                alignItems:"center",
            }}>
                <Image 
                    source={require('@/assets/images/loading.gif')}
                    width={scaleFont(100)}
                    height={scaleFont(100)} 
                />
            </View>
        </>
    )
}